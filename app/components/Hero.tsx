import { Button } from './ui/Button';

export default function Hero() {
  return (
    <div className="relative pt-20 pb-12 text-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-6">
        <h1 className="mx-auto max-w-5xl text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
          Cursor Sharing
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mt-2">
            Dashboard
          </span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg font-light text-zinc-400 md:text-xl leading-relaxed">
          Join thousands of developers discovering the optimal AI workflows. 
          <br className="hidden md:block" />
          Explore community-favorite models, modes, and plans.
        </p>
      </div>
    </div>
  );
}
