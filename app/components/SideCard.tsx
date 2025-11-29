import { FeaturedTip } from "../data/mockData";

interface SideCardProps {
  tip: FeaturedTip;
}

export default function SideCard({ tip }: SideCardProps) {
  return (
    <a
      href="#"
      className="group block rounded-xl bg-zinc-900/60 p-4 backdrop-blur-sm transition-all hover:bg-zinc-800/80"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
          style={{ backgroundColor: `${tip.color}20` }}
        >
          {tip.icon}
        </div>
        <h3 className="mb-1 text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
          {tip.title}
        </h3>
        <p className="text-xs leading-relaxed text-zinc-400">
          {tip.description}
        </p>
      </div>
    </a>
  );
}

