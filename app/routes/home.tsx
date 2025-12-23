import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Year 2026 - Premium Experience" },
    { name: "description", content: "A high-end digital experience crafted with GSAP and Tailwind CSS." },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl px-6 pt-48 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Next Generation Web
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-gray-900 dark:text-white mb-8 transition-colors duration-500">
          Crafting <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Digital Future.</span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-12 transition-colors duration-500">
          Experience the seamless fusion of performance and aesthetics. 
          Built with React Router 7, GSAP, and Tailwind CSS for the ultimate user journey.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/10 dark:shadow-white/10">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
            View Showcase
          </button>
        </div>
      </section>

      {/* Grid Section */}
      <section className="w-full max-w-7xl px-6 pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Fluid Motion", desc: "Smooth scroll-driven animations with GSAP ScrollTrigger." },
            { title: "Dark Mode", desc: "Native Tailwind CSS dark mode with system preference sync." },
            { title: "Responsive", desc: "Perfectly optimized for mobile, tablet, and desktop views." },
            { title: "Performance", desc: "Lightning fast page loads and buttery smooth 60fps interactions." },
            { title: "Glassmorphism", desc: "Elegant frosted glass effects using Tailwind's backdrop filters." },
            { title: "i18n Ready", desc: "Internationalization support built into the core navigation." }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 hover:border-blue-500/50 dark:hover:border-blue-500/30 transition-all duration-500 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-xl font-black text-blue-600 shadow-sm">
                {(i + 1).toString().padStart(2, '0')}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-32 pt-12 border-t border-gray-100 dark:border-white/5 flex flex-col items-center gap-4">
          <p className="text-gray-400 dark:text-gray-500 text-sm font-medium tracking-widest uppercase italic">
            End of demonstration
          </p>
          <div className="w-1 h-20 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Spacer to push content away from footer */}
      <div className="h-24 md:h-40"></div>
    </div>
  );
}
