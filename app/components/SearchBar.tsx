export default function SearchBar() {
  return (
    <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-center">
      <div className="relative w-full max-w-md">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search tips, workflows, users..."
          className="w-full rounded-full border border-zinc-700 bg-zinc-900/80 py-3 pl-12 pr-4 text-sm text-zinc-300 placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
      </div>
      <button className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-200">
        <svg
          className="h-4 w-4"
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
        Share your tip
      </button>
    </div>
  );
}

