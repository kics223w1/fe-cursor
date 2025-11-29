const navItems = ["Models", "Plans", "Modes", "Countries"];

export default function Navigation() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 text-sm">
      {navItems.map((item, index) => (
        <a
          key={item}
          href="#"
          className={`transition-colors ${
            index === 0
              ? "text-cyan-400 hover:text-cyan-300"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {item}
        </a>
      ))}
    </nav>
  );
}
