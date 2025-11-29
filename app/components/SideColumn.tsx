import { FeaturedTip } from "../data/mockData";
import SideCard from "./SideCard";

interface SideColumnProps {
  tips: FeaturedTip[];
  position: "left" | "right";
}

export default function SideColumn({ tips, position }: SideColumnProps) {
  return (
    <aside
      className={`hidden w-52 flex-col gap-3 xl:flex ${
        position === "left" ? "items-end" : "items-start"
      }`}
    >
      {tips.map((tip) => (
        <SideCard key={tip.id} tip={tip} />
      ))}
    </aside>
  );
}

