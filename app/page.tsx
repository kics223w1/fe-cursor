import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-black bg-grid-pattern bg-gradient-radial">
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-6">
        {/* Center Content */}
        <main className="flex w-full flex-col items-center">
          <Hero />
          <SearchBar />
          <div className="w-full py-8">
            <Dashboard />
          </div>
          <footer className="w-full border-t border-zinc-900 py-8 text-center">
            <p className="text-sm text-zinc-600">
              Built with ♥ by the Cursor community
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
