"use client";

import { useState, useCallback, useMemo } from "react";
import { Submission } from "../types";
import { useCachedFetch, useCache } from "../lib/cache";

interface LeaderboardResponse {
  data: Submission[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

// Helper to get flag emoji from country name
function getFlagEmoji(countryName: string) {
  if (!countryName) return "🌍";
  
  const flags: Record<string, string> = {
    "United States": "🇺🇸", "USA": "🇺🇸",
    "United Kingdom": "🇬🇧", "UK": "🇬🇧",
    "France": "🇫🇷",
    "Germany": "🇩🇪",
    "Japan": "🇯🇵",
    "China": "🇨🇳",
    "India": "🇮🇳",
    "Brazil": "🇧🇷",
    "Canada": "🇨🇦",
    "Australia": "🇦🇺",
    "Spain": "🇪🇸",
    "Italy": "🇮🇹",
    "Netherlands": "🇳🇱",
    "Sweden": "🇸🇪",
    "Switzerland": "🇨🇭",
    "Singapore": "🇸🇬",
    "South Korea": "🇰🇷",
    "Russia": "🇷🇺",
    "Poland": "🇵🇱",
    "Ukraine": "🇺🇦",
    "Vietnam": "🇻🇳",
    "Indonesia": "🇮🇩",
    "Mexico": "🇲🇽",
    "Argentina": "🇦🇷",
    "Israel": "🇮🇱",
    "Other": "🌍"
  };

  return flags[countryName] || "🌍";
}

// Mobile card component for each submission
function SubmissionCard({ submission }: { submission: Submission }) {
  const flag = getFlagEmoji(submission.country);
  
  return (
    <div className="border-b border-zinc-800/50 p-4 transition-colors hover:bg-zinc-800/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl flex-shrink-0">{flag}</span>
          <div className="min-w-0">
            <div className="font-medium text-white truncate">
              {submission.displayName || "Anonymous"}
            </div>
            <div className="text-xs text-zinc-500 truncate">{submission.country}</div>
          </div>
        </div>
        <span
          className={`flex-shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            submission.favoriteMode === "Plan"
              ? "bg-purple-400/10 text-purple-400 ring-purple-400/30"
              : submission.favoriteMode === "Agent"
              ? "bg-emerald-400/10 text-emerald-400 ring-emerald-400/30"
              : "bg-blue-400/10 text-blue-400 ring-blue-400/30"
          } ring-1 ring-inset`}
        >
          {submission.favoriteMode}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-md bg-zinc-800 px-2 py-0.5 text-xs font-medium text-cyan-300 ring-1 ring-inset ring-cyan-400/20">
          {submission.favoriteModel}
        </span>
        <span className="inline-flex items-center rounded-md bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-zinc-700">
          {submission.cursorPlan}
        </span>
      </div>
    </div>
  );
}

// Desktop table row component
function DesktopRow({ submission }: { submission: Submission }) {
  const flag = getFlagEmoji(submission.country);

  return (
    <tr className="border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30">
      <td className="py-4 pl-4 pr-2">
        <div className="flex items-center gap-2" title={submission.country}>
          <span className="text-lg">{flag}</span>
          <span className="text-sm text-zinc-400">{submission.country}</span>
        </div>
      </td>
      <td className="py-4 px-2">
        <div className="font-medium text-white">
          {submission.displayName || "Anonymous"}
        </div>
      </td>
      <td className="py-4 px-2">
        <span className="inline-flex items-center rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-cyan-300 ring-1 ring-inset ring-cyan-400/20">
          {submission.favoriteModel}
        </span>
      </td>
      <td className="py-4 px-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
            submission.favoriteMode === "Plan"
              ? "bg-purple-400/10 text-purple-400 ring-purple-400/30"
              : submission.favoriteMode === "Agent"
              ? "bg-emerald-400/10 text-emerald-400 ring-emerald-400/30"
              : "bg-blue-400/10 text-blue-400 ring-blue-400/30"
          } ring-1 ring-inset`}
        >
          {submission.favoriteMode}
        </span>
      </td>
      <td className="py-4 pl-2 pr-4">
        <span className="inline-flex items-center rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-zinc-700">
          {submission.cursorPlan}
        </span>
      </td>
    </tr>
  );
}

export default function Leaderboard() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAtDesc");
  const cache = useCache();

  const cacheKey = useMemo(() => `leaderboard-${page}-${sortBy}`, [page, sortBy]);

  const fetchLeaderboard = useCallback(async () => {
    const res = await fetch(`/api/leaderboard?page=${page}&limit=20&sortBy=${sortBy}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json() as Promise<LeaderboardResponse>;
  }, [page, sortBy]);

  const { data, loading, error } = useCachedFetch<LeaderboardResponse>(
    cacheKey,
    fetchLeaderboard,
    { ttlMs: 2 * 60 * 1000 } // Cache for 2 minutes
  );

  const submissions = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  const handlePrevPage = () => {
    if (page > 1) setPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(p => p + 1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setPage(1);
  };

  return (
    <div className="w-full rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50">
      <div className="flex flex-col gap-4 border-b border-zinc-800 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white">Community Submissions</h2>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 pr-8 text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="createdAtDesc">Newest First</option>
              <option value="createdAtAsc">Oldest First</option>
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile view - Card layout */}
      <div className="md:hidden">
        {loading ? (
          <div className="py-12 text-center text-zinc-500">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="py-12 text-center text-zinc-500">
            Failed to load submissions
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-12 text-center text-zinc-500">
            No submissions yet. Be the first to share!
          </div>
        ) : (
          submissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))
        )}
      </div>

      {/* Desktop view - Table layout */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
              <th className="py-3 pl-4 pr-2 text-left font-medium">Country</th>
              <th className="py-3 px-2 text-left font-medium">User</th>
              <th className="py-3 px-2 text-left font-medium">Model</th>
              <th className="py-3 px-2 text-left font-medium">Mode</th>
              <th className="py-3 pl-2 pr-4 text-left font-medium">Plan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-500">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-500">
                  Failed to load submissions
                </td>
              </tr>
            ) : submissions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-500">
                  No submissions yet. Be the first to share!
                </td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <DesktopRow key={submission.id} submission={submission} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800 p-4">
        <button 
          onClick={handlePrevPage}
          disabled={page === 1 || loading}
          className="text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        <span className="text-sm text-zinc-500">
          Page {page} of {totalPages || 1}
        </span>
        <button 
          onClick={handleNextPage}
          disabled={page >= totalPages || loading}
          className="text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
