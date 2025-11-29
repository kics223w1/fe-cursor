'use client';

import Link from 'next/link';

export default function SearchBar() {
  return (
    <div className="flex justify-center py-8">
      <Link href="/share" className="group relative inline-flex items-center justify-center">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-70 blur transition duration-200 group-hover:opacity-100" />
        <button className="relative flex items-center gap-3 rounded-full bg-zinc-950 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/10 transition-all hover:bg-zinc-900">
          <svg
            className="h-5 w-5 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Share your setup</span>
        </button>
      </Link>
    </div>
  );
}
