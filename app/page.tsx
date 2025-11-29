import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Navigation from "./components/Navigation";
import SideColumn from "./components/SideColumn";
import Leaderboard from "./components/Leaderboard";
import { leftSideTips, rightSideTips } from "./data/mockData";

export default function Home() {
  return (
    <div className="min-h-screen bg-black bg-grid-pattern bg-gradient-radial">
      <div className="mx-auto flex max-w-[1600px] justify-center gap-6 px-4 py-6">
        {/* Left Column - Now starting from the top */}
        <div className="pt-20">
          <SideColumn tips={leftSideTips} position="left" />
        </div>

        {/* Center Content */}
        <main className="flex w-full max-w-3xl flex-col items-center">
          <Hero />
          <SearchBar />
          <Navigation />
          <div className="w-full py-8">
            <Leaderboard />
          </div>
          <footer className="w-full border-t border-zinc-900 py-8 text-center">
            <p className="text-sm text-zinc-600">
              Built with ♥ by the Cursor community
            </p>
          </footer>
        </main>

        {/* Right Column - Now starting from the top */}
        <div className="pt-20">
          <SideColumn tips={rightSideTips} position="right" />
        </div>
      </div>
    </div>
  );
}
