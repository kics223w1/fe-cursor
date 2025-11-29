import { FeaturedTip } from "../data/mockData";
import SideCard from "./SideCard";

interface SideColumnProps {
  tips: FeaturedTip[];
  position: "left" | "right";
}

export default function SideColumn({ tips, position }: SideColumnProps) {
  return (
    <aside className="hidden w-64 flex-col gap-4 lg:flex">
      {tips.map((tip) => (
        <SideCard key={tip.id} tip={tip} />
      ))}
    </aside>
  );
}
