"use client";

import { useState } from "react";
import { leaderboardUsers, filterOptions } from "../data/mockData";
import UserRow from "./UserRow";

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState("Likes");
  const [timeRange, setTimeRange] = useState("All time");

  return (
    <div className="w-full rounded-2xl bg-zinc-900/40 backdrop-blur-sm">
      <div className="flex flex-col gap-4 border-b border-zinc-800 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white">Leaderboard</h2>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 pr-8 text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              {filterOptions.sortBy.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 pr-8 text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              {filterOptions.timeRange.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
              <th className="py-3 pl-4 text-center font-medium">#</th>
              <th className="py-3 text-left font-medium">Tip</th>
              <th className="py-3 text-left font-medium">Shared by</th>
              <th className="py-3 text-right font-medium">Likes</th>
              <th className="py-3 pr-4 text-right font-medium">MoM Growth</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardUsers.map((user, index) => (
              <UserRow key={user.id} user={user} rank={index + 1} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center border-t border-zinc-800 py-4">
        <button className="text-sm text-cyan-400 transition-colors hover:text-cyan-300">
          View all tips →
        </button>
      </div>
    </div>
  );
}

