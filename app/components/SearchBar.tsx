export default function SearchBar() {
  return (
    <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-center">
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

