import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Navigation from "./components/Navigation";
import SideColumn from "./components/SideColumn";
import Leaderboard from "./components/Leaderboard";
import { leftSideTips, rightSideTips } from "./data/mockData";

export default function Home() {
  return (
    <div className="min-h-screen bg-grid-pattern bg-gradient-radial">
      <div className="mx-auto max-w-screen-2xl px-4">
        <Header />
        <Hero />
        <SearchBar />
        <Navigation />

        <div className="flex justify-center gap-6 py-8">
          <SideColumn tips={leftSideTips} position="left" />

          <main className="w-full max-w-3xl">
            <Leaderboard />
          </main>

          <SideColumn tips={rightSideTips} position="right" />
        </div>

        <footer className="border-t border-zinc-800/50 py-8 text-center">
          <p className="text-sm text-zinc-500">
            Built with ♥ by the Cursor community
          </p>
          <a
            href="#"
            className="mt-2 inline-flex items-center gap-1 text-xs text-zinc-600 transition-colors hover:text-zinc-400"
          >
            <span>☰</span> Advertise
          </a>
        </footer>
      </div>
    </div>
  );
}
