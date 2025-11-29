"use client";

import { useState, useEffect } from "react";
import UserRow from "./UserRow";
import { Submission } from "../types";

export default function Leaderboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAtDesc");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/leaderboard?page=${page}&limit=20&sortBy=${sortBy}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setSubmissions(data.data);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, sortBy]);

  const handlePrevPage = () => {
    if (page > 1) setPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(p => p + 1);
  };

  return (
    <div className="w-full rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50">
      <div className="flex flex-col gap-4 border-b border-zinc-800 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white">Community Submissions</h2>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 pr-8 text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="createdAtDesc">Newest First</option>
              <option value="createdAtAsc">Oldest First</option>
            </select>
            {/* Chevron Icon */}
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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
              <th className="py-3 pl-4 text-left font-medium w-[200px]">Country</th>
              <th className="py-3 text-left font-medium">User</th>
              <th className="py-3 text-left font-medium">Model</th>
              <th className="py-3 text-left font-medium">Mode</th>
              <th className="py-3 text-left font-medium">Plan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-500">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
                </td>
              </tr>
            ) : submissions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-500">
                  No submissions yet. Be the first to share!
                </td>
              </tr>
            ) : (
              submissions.map((submission, index) => (
                <UserRow 
                  key={submission.id} 
                  submission={submission} 
                  rank={(page - 1) * 20 + index + 1} 
                />
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
