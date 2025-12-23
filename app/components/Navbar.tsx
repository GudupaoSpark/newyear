import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun, Moon, Languages } from "lucide-react";

// Import logos
import logoLight from "../assets/logo/logo.png";
import logoDark from "../assets/logo/logo-dark.png";
import logoMobileLight from "../assets/logo/logo-mobile.png";
import logoMobileDark from "../assets/logo/logo-mobile-dark.png";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("EN");
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoMainRef = useRef<HTMLDivElement>(null);
  const logoMobileRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial dark mode from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "150px top",
          scrub: 0.8,
        },
      });

      // 1. Navbar Container Transformation
      tl.to(containerRef.current, {
        maxWidth: "440px",
        height: "52px",
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        backgroundColor: "var(--nav-bg-scrolled)",
        backdropFilter: "blur(24px)",
        ease: "none",
      }, 0);

      // 2. Logo Switching
      tl.to(logoMainRef.current, {
        opacity: 0,
        x: -20,
        scale: 0.8,
        width: 0,
        display: "none",
        ease: "none",
      }, 0);

      tl.fromTo(logoMobileRef.current, 
        { opacity: 0, scale: 0.5, display: "none", x: 20 },
        { opacity: 1, scale: 1, display: "flex", x: 0, ease: "none" },
        0.4
      );

      // 3. Menu Items Hiding
      tl.to(menuRef.current, {
        opacity: 0,
        scale: 0.9,
        width: 0,
        margin: 0,
        display: "none",
        ease: "none",
      }, 0);

    }, navRef);

    return () => ctx.revert();
  }, []); // Remove isDark dependency to prevent recreation flash

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    
    // Add a temporary class to handle the transition smoothly
    document.documentElement.classList.add("theme-transitioning");
    
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Remove the class after the transition finishes
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 500);
  };

  const toggleLang = () => setLang(l => l === "EN" ? "ZH" : "EN");

  return (
    <nav ref={navRef} className="fixed top-8 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
      <div
        ref={containerRef}
        className="nav-container pointer-events-auto flex items-center justify-between w-full max-w-6xl h-16 px-8 rounded-full border border-white/20 backdrop-blur-2xl shadow-2xl shadow-black/5 dark:border-white/10"
      >
        {/* Logo Section */}
        <div className="flex items-center">
          <div ref={logoMainRef} className="relative flex items-center shrink-0 h-7 w-24">
            <img 
              src={logoLight} 
              alt="Logo Light" 
              className={`absolute left-0 top-0 h-7 w-auto object-contain transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`} 
            />
            <img 
              src={logoDark} 
              alt="Logo Dark" 
              className={`absolute left-0 top-0 h-7 w-auto object-contain transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`} 
            />
          </div>
          <div ref={logoMobileRef} className="hidden relative items-center shrink-0 h-8 w-8">
            <img 
              src={logoMobileLight} 
              alt="Mobile Logo Light" 
              className={`absolute left-0 top-0 h-8 w-auto object-contain transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`} 
            />
            <img 
              src={logoMobileDark} 
              alt="Mobile Logo Dark" 
              className={`absolute left-0 top-0 h-8 w-auto object-contain transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`} 
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <div ref={menuRef} className="hidden lg:flex items-center gap-10 mx-auto">
          {["Showcase", "Solutions", "Innovation", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] font-bold tracking-widest uppercase text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleLang}
            className="group flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 text-gray-700 dark:text-gray-300"
          >
            <Languages size={16} className="group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-black tracking-tighter">{lang}</span>
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 text-gray-700 dark:text-gray-300 active:scale-90"
          >
            {isDark ? <Sun size={19} strokeWidth={2.5} /> : <Moon size={19} strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
