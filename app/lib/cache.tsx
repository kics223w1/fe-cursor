'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheContextType {
  get: <T>(key: string) => T | null;
  set: <T>(key: string, data: T, ttlMs?: number) => void;
  invalidate: (key: string) => void;
  invalidateAll: () => void;
}

const CacheContext = createContext<CacheContextType | null>(null);

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export function CacheProvider({ children }: { children: React.ReactNode }) {
  const cacheRef = useRef<Map<string, CacheEntry<unknown>>>(new Map());

  const get = useCallback(<T,>(key: string): T | null => {
    const entry = cacheRef.current.get(key);
    if (!entry) return null;
    
    // Check if expired
    if (Date.now() > entry.expiresAt) {
      cacheRef.current.delete(key);
      return null;
    }
    
    return entry.data as T;
  }, []);

  const set = useCallback(<T,>(key: string, data: T, ttlMs: number = DEFAULT_TTL) => {
    const now = Date.now();
    cacheRef.current.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttlMs,
    });
  }, []);

  const invalidate = useCallback((key: string) => {
    cacheRef.current.delete(key);
  }, []);

  const invalidateAll = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  return (
    <CacheContext.Provider value={{ get, set, invalidate, invalidateAll }}>
      {children}
    </CacheContext.Provider>
  );
}

export function useCache() {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
}

// Custom hook for cached fetch with deduplication
interface UseCachedFetchOptions {
  ttlMs?: number;
  revalidateOnMount?: boolean;
}

interface UseCachedFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Track in-flight requests to deduplicate
const inFlightRequests = new Map<string, Promise<unknown>>();

export function useCachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseCachedFetchOptions = {}
): UseCachedFetchResult<T> {
  const { ttlMs = DEFAULT_TTL, revalidateOnMount = false } = options;
  const cache = useCache();
  const [data, setData] = useState<T | null>(() => cache.get<T>(key));
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);
  const fetchedRef = useRef(false);

  const fetchData = useCallback(async (force = false) => {
    // Check cache first (unless forcing)
    if (!force) {
      const cached = cache.get<T>(key);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
    }

    // Check if there's already an in-flight request for this key
    const existingRequest = inFlightRequests.get(key);
    if (existingRequest) {
      try {
        const result = await existingRequest as T;
        if (mountedRef.current) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(err as Error);
          setLoading(false);
        }
      }
      return;
    }

    setLoading(true);
    setError(null);

    // Create the request and store it
    const request = fetcher();
    inFlightRequests.set(key, request);

    try {
      const result = await request;
      cache.set(key, result, ttlMs);
      if (mountedRef.current) {
        setData(result);
        setLoading(false);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err as Error);
        setLoading(false);
      }
    } finally {
      inFlightRequests.delete(key);
    }
  }, [key, fetcher, cache, ttlMs]);

  // Initial fetch
  React.useEffect(() => {
    mountedRef.current = true;
    
    if (!fetchedRef.current || revalidateOnMount) {
      fetchedRef.current = true;
      fetchData();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [fetchData, revalidateOnMount]);

  const refetch = useCallback(async () => {
    cache.invalidate(key);
    await fetchData(true);
  }, [cache, key, fetchData]);

  return { data, loading, error, refetch };
}

