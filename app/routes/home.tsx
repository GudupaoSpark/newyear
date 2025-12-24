import type { Route } from "./+types/home";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/config";

import projectsImg from "../assets/home/projects.webp";
import huodongImg from "../assets/home/huodong.webp";
import newyearImg from "../assets/home/newyear.webp";
import teamImg from "../assets/home/team.webp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: i18n.t("home.meta.title") },
    { name: "description", content: i18n.t("home.meta.description") },
  ];
}

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center w-full min-h-screen overflow-hidden selection:bg-red-500/30">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-red-600/20 to-orange-600/20 blur-[80px] animate-pulse duration-[4000ms]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-red-600/20 to-orange-600/20 blur-[80px] animate-pulse duration-[5000ms]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl px-6 pt-48 pb-32 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-red-200/50 dark:border-white/10 mb-8 backdrop-blur-md shadow-lg shadow-red-500/5 hover:scale-105 transition-transform duration-500 cursor-default animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-red-500 to-orange-500"></span>
          </span>
          <span className="text-xs font-black uppercase tracking-[0.25em] bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            {t("home.hero.badge")}
          </span>
        </div>
        
        <h1 className="relative text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-white/60 mb-8 leading-[0.9] transition-all duration-500 select-none">
          {t("home.hero.title_1")} <br />
          <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            {t("home.hero.title_2")}
          </span>
        </h1>
        
        <p className="max-w-2xl text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12 font-medium">
          {t("home.hero.subtitle")} <br />
          <span className="text-red-600 dark:text-red-400">{t("home.hero.highlight")}</span>{t("home.hero.subtitle_suffix")}
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-red-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center gap-2">
              {t("home.hero.cta_primary")}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <button className="px-8 py-4 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold text-sm hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-xl">
            {t("home.hero.cta_secondary")}
          </button>
        </div>
      </section>

      {/* Grid Section - Features */}
      <section id="features" className="relative w-full max-w-7xl px-6 py-24 z-10 scroll-mt-20">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            {t("home.features.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            {t("home.features.title_main")}<span className="text-red-600 dark:text-red-500">{t("home.features.title_highlight")}</span>{t("home.features.title_suffix")}
          </h2>
          <p className="max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            {t("home.features.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            { key: "happy_new_year", icon: "🎉" },
            { key: "health", icon: "💪" },
            { key: "family", icon: "👨‍👩‍👧‍👦" },
            { key: "wealth", icon: "💰" },
            { key: "study", icon: "📖" },
            { key: "work", icon: "💼" }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="group relative p-8 rounded-[2rem] bg-white/60 dark:bg-zinc-900/40 border border-white/60 dark:border-white/5 hover:border-red-500/30 dark:hover:border-red-500/30 transition-all duration-500 backdrop-blur-md overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10"
            >
              {/* Card Glow Effect */}
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-colors duration-500"></div>
              
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-white/5 dark:to-white/5 border border-red-100 dark:border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              
              <h3 className="relative text-xl font-black text-gray-900 dark:text-white mt-6 mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {t(`home.features.items.${feature.key}.title`)}
              </h3>
              
              <p className="relative text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
                {t(`home.features.items.${feature.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="relative w-full max-w-7xl px-6 py-24 z-10 scroll-mt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <div className="flex flex-col items-start text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              {t("home.showcase.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t("home.showcase.title_main")}<span className="text-orange-500">{t("home.showcase.title_highlight")}</span>{t("home.showcase.title_suffix")}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {t("home.showcase.description")}
            </p>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative aspect-video md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-zinc-800">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
             <img src={projectsImg} alt="Showcase 1" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2 block">{t("home.showcase.projects.featured")}</span>
                <h3 className="text-2xl font-black text-white mb-2">{t("home.showcase.projects.open_source.title")}</h3>
                <p className="text-white/80 text-sm line-clamp-2">{t("home.showcase.projects.open_source.desc")}</p>
             </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="group relative flex-1 rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-zinc-800 min-h-[200px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <img src={huodongImg} alt="Showcase 2" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-xl font-black text-white mb-1">{t("home.showcase.projects.suggestions.title")}</h3>
                <p className="text-white/80 text-xs">{t("home.showcase.projects.suggestions.desc")}</p>
              </div>
            </div>
            <div className="group relative flex-1 rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-zinc-800 min-h-[200px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <img src={newyearImg} alt="Showcase 3" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-xl font-black text-white mb-1">{t("home.showcase.projects.newyear.title")}</h3>
                <p className="text-white/80 text-xs">{t("home.showcase.projects.newyear.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="relative w-full max-w-7xl px-6 py-24 z-10 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-[3rem] blur-3xl transform -rotate-6"></div>
            <img 
              src={teamImg} 
              alt="Team" 
              loading="lazy"
              decoding="async"
              className="relative rounded-[3rem] shadow-2xl border-4 border-white dark:border-white/10 transition-all duration-700"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6">
              {t("home.about.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">
              {t("home.about.title_main")}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">{t("home.about.title_highlight")}</span>{t("home.about.title_suffix")}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
              {t("home.about.description")}
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">5+</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t("home.about.stats.members")}</div>
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">50+</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t("home.about.stats.projects")}</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Bottom Message */}
      <div className="relative z-10 flex flex-col items-center gap-6 pb-12 md:pb-24 px-6 text-center">
        <div className="flex items-center gap-3 md:gap-4 text-red-300/50">
          <div className="w-8 md:w-12 h-[1px] bg-current"></div>
          <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-current"></div>
          <div className="w-8 md:w-12 h-[1px] bg-current"></div>
        </div>
        <p className="text-red-900/40 dark:text-red-200/40 text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase max-w-[280px] md:max-w-none leading-relaxed">
          {t("home.bottom")}
        </p>
      </div>

      {/* Spacer to push content away from footer */}
      <div className="h-24 md:h-40"></div>
    </div>
  );
}
