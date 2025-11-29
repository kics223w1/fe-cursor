export default function Header() {
  return (
    <header className="flex items-center justify-center gap-2 py-6">
      <div className="flex items-center gap-2">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className="text-cyan-400"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
        <span className="text-xl font-semibold tracking-tight text-white">
          CursorSharing
        </span>
      </div>
    </header>
  );
}

