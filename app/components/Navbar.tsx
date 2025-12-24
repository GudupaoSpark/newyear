import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Logo paths
const logoLight = "/assets/logo/logo.webp";
const logoDark = "/assets/logo/logo-dark.webp";
const logoMobileLight = "/assets/logo/logo-mobile.webp";
const logoMobileDark = "/assets/logo/logo-dark-mobile.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Correctly initialize state from localStorage/system preference to avoid flash
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return savedTheme === "dark" || (!savedTheme && prefersDark);
    }
    return false;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoMainRef = useRef<HTMLDivElement>(null);
  const logoMobileRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 2. Use gsap.matchMedia for robust responsive animations
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "100px top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Navbar Container Transformation
      tl.to(containerRef.current, {
        maxWidth: isDesktop ? "440px" : "320px",
        height: "52px",
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        backgroundColor: "var(--nav-bg-scrolled)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        ease: "none",
      }, 0);

      // Logo Switching
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

      // Menu Items Hiding (Desktop Only)
      if (isDesktop && menuRef.current) {
        tl.to(menuRef.current, {
          opacity: 0,
          scale: 0.9,
          width: 0,
          margin: 0,
          display: "none",
          ease: "none",
        }, 0);
      }

      return () => {
        // Cleanup logic if needed
      };
    });

    return () => mm.revert();
  }, []); 

  // Sync isDark state with document class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Handle Mobile Menu Animation
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(mobileMenuRef.current, 
        { opacity: 0, y: -20, display: "none" },
        { opacity: 1, y: 0, display: "flex", duration: 0.4, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "auto";
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (mobileMenuRef.current) mobileMenuRef.current.style.display = "none";
        }
      });
    }
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    

    
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }


  };

  const toggleLang = () => {
    const currentLang = i18n.language;
    const nextLang = currentLang === "en" ? "zh" : "en";
    
    // Get current path without the language prefix
    let pathname = location.pathname;
    if (pathname.startsWith(`/${currentLang}`)) {
      pathname = pathname.replace(`/${currentLang}`, "");
    }
    
    // Navigate to the same path but with the new language prefix
    navigate(`/${nextLang}${pathname}${location.search}${location.hash}`);
  };

  const menuItems = [
    { id: "features", label: t("nav.features") },
    { id: "showcase", label: t("nav.showcase") },
    { id: "about", label: t("nav.about") },
  ];

  return (
    <>
      <nav ref={navRef} className="fixed top-8 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
        <div
          ref={containerRef}
          className="nav-container pointer-events-auto flex items-center justify-between w-full max-w-7xl h-16 px-4 md:px-8 rounded-full border border-white/40 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-xl shadow-2xl shadow-red-500/5 hover:border-red-500/20 transition-colors duration-500"
        >
          {/* Logo Section */}
          <div className="flex-1 flex justify-start">
            <Link to={`/${i18n.language}`} className="flex items-center hover:opacity-80 transition-opacity duration-300">
            <div ref={logoMainRef} className="relative flex items-center shrink-0 h-7 w-24">
              <img 
                 src={logoLight} 
                 alt="Logo Light" 
                 fetchPriority="high"
                 decoding="async"
                 className={`absolute left-0 top-0 h-7 w-auto object-contain transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`} 
               />
               <img 
                 src={logoDark} 
                 alt="Logo Dark" 
                 fetchPriority="high"
                 decoding="async"
                 className={`absolute left-0 top-0 h-7 w-auto object-contain transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`} 
               />
             </div>
             <div ref={logoMobileRef} className="hidden relative items-center shrink-0 h-8 w-8">
               <img 
                 src={logoMobileLight} 
                 alt="Mobile Logo Light" 
                 fetchPriority="high"
                 decoding="async"
                 className={`absolute left-0 top-0 h-8 w-auto object-contain transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`} 
               />
               <img 
                 src={logoMobileDark} 
                 alt="Mobile Logo Dark" 
                 fetchPriority="high"
                 decoding="async"
                 className={`absolute left-0 top-0 h-8 w-auto object-contain transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`} 
               />
            </div>
          </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <div ref={menuRef} className="hidden lg:flex items-center gap-10 flex-none">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative text-[13px] font-bold tracking-widest uppercase text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action Controls */}
          <div className="flex-1 flex items-center justify-end gap-1 md:gap-3 shrink-0">
            <button
              onClick={toggleLang}
              className="group flex items-center gap-2 px-3 md:px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 text-gray-700 dark:text-gray-300"
            >
              <Languages size={16} className="group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-black tracking-tighter">{i18n.language.toUpperCase()}</span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 text-gray-700 dark:text-gray-300 active:scale-90"
            >
              {isDark ? <Sun size={19} strokeWidth={2.5} /> : <Moon size={19} strokeWidth={2.5} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 text-gray-700 dark:text-gray-300 active:scale-90"
            >
              {isMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-[90] hidden flex-col items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-3xl px-8"
      >
        <div className="flex flex-col items-center gap-8">
          {menuItems.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white hover:text-blue-500 transition-colors duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <div className="absolute bottom-12 flex flex-col items-center gap-6">
          <div className="h-px w-12 bg-gray-200 dark:bg-white/10" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
            Next Generation Web © 2026
          </p>
        </div>
      </div>
    </>
  );
}

