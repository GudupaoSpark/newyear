import { Mail, MapPin, Languages, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

// Logo paths
const logoLight = "/assets/logo/logo.webp";
const logoDark = "/assets/logo/logo-dark.webp";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isWelcome = location.pathname.endsWith("/welcome");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check dark mode status whenever it changes on the document
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

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

  const socialIcons = [
    { 
      icon: (
        <div className="p-1 rounded-xl border-2 border-zinc-400 dark:border-zinc-500">
          <Activity size={20} className="text-zinc-400 dark:text-zinc-500" />
        </div>
      ), 
      href: "https://status.gudupao.top/", 
      label: t("footer.status")
    },
    { icon: <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 mx-4" />, href: undefined, label: "separator" },
    { icon: <img src="https://simpleicons.org/icons/x.svg" className="w-6 h-6 dark:invert opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" alt="X" loading="lazy" decoding="async" />, href: "https://x.com/GudupaoSpark", label: t("footer.x") },
    { 
      icon: (
        <div className="bg-zinc-400 dark:bg-zinc-500 rounded-full p-1">
          <img src="https://simpleicons.org/icons/github.svg" className="w-5 h-5 invert dark:invert-0" alt="GitHub" loading="lazy" decoding="async" />
        </div>
      ), 
      href: "https://github.com/GudupaoSpark", 
      label: t("footer.github")
    },
    { icon: <img src="https://simpleicons.org/icons/youtube.svg" className="w-8 h-8 dark:invert opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" alt="YouTube" loading="lazy" decoding="async" />, href: "https://www.youtube.com/@GudupaoSpark", label: t("footer.youtube") },
    { icon: <img src="https://simpleicons.org/icons/bilibili.svg" className="w-6 h-6 dark:invert opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" alt="Bilibili" loading="lazy" decoding="async" />, href: "https://space.bilibili.com/1016857888", label: t("footer.bilibili") },
    { 
        icon: (
          <svg viewBox="0 0 1024 1024" className="w-6 h-6 fill-zinc-400 dark:fill-zinc-500 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" xmlns="http://www.w3.org/2000/svg">
            <path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" />
          </svg>
        ), 
        href: "https://qm.qq.com/q/B3vKejsGBi", 
        label: t("footer.qqGroup")
      },
    { icon: <img src="https://simpleicons.org/icons/discord.svg" className="w-6 h-6 dark:invert opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" alt="Discord" loading="lazy" decoding="async" />, href: "https://discord.gg/SC78fv3ZRF", label: t("footer.discord") },
  ];

  const footerSections: {
    title: string;
    links: { text: string; href?: string; icon?: React.ReactNode }[];
  }[] = [
    {
      title: t("footer.company"),
      links: [
        { text: t("footer.about"), href: "https://gudupao.top/about" },
        { text: t("footer.projects"), href: "https://gudupao.top/projects" },
        { text: t("footer.contact"), href: "https://gudupao.top/contact" }
      ]
    },
    {
      title: t("footer.followUs"),
      links: [
        { text: t("footer.x"), href: "https://x.com/GudupaoSpark" },
        { text: t("footer.github"), href: "https://github.com/GudupaoSpark" },
        { text: t("footer.youtube"), href: "https://www.youtube.com/@GudupaoSpark" },
        { text: t("footer.bilibili"), href: "https://space.bilibili.com/1016857888" },
        { text: t("footer.qqGroup"), href: "https://qm.qq.com/q/B3vKejsGBi" },
        { text: t("footer.discord"), href: "https://discord.gg/SC78fv3ZRF" }
      ]
    },
    {
      title: t("footer.contactInfo"),
      links: [
        { text: "official@gudupao.top", icon: <Mail size={14} className="text-red-500" />, href: "mailto:official@gudupao.top" },
        { text: t("footer.address"), icon: <MapPin size={14} className="text-red-500" /> }
      ]
    }
  ];

  return (
    <footer className="w-full relative bg-white/80 dark:bg-zinc-950/80 border-t border-red-100 dark:border-white/5 transition-all duration-500 backdrop-blur-xl">
      {/* Footer Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* Top Section: Socials Only */}
        {!isWelcome && (
          <div className="flex items-center justify-center md:justify-start flex-wrap gap-2 md:gap-0 mb-8 md:mb-12">
            {socialIcons.map((social, i) => (
              social.href ? (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-2 mx-0.5 md:mx-1 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 hover:border-red-500/30 dark:hover:border-red-500/30 text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-500 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ) : (
                <div key={i} className="hidden md:block px-2 self-center">
                  <div className="w-[1.5px] h-6 bg-zinc-200 dark:bg-zinc-800"></div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Main Content: Links & Big Logo */}
        {!isWelcome && (
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-6 lg:gap-0 flex-1 w-full max-w-3xl">
              {/* Navigation Sections */}
              {footerSections.map((section, i) => (
                <div key={i} className="flex flex-col gap-4 text-center md:text-left">
                  <h4 className="text-[11px] md:text-sm font-black tracking-[0.2em] uppercase text-red-900/40 dark:text-red-100/40 mb-2">
                    {section.title}
                  </h4>
                  <ul className="flex flex-col gap-3 md:gap-2 items-center md:items-start">
                    {section.links.map((link, j) => (
                      <li key={j} className="w-full">
                        {link.href ? (
                          <a 
                            href={link.href}
                            target={link.href.startsWith('http') ? "_blank" : undefined}
                            rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                            className="group flex items-center justify-center md:justify-start gap-3 text-sm md:text-base font-bold text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
                          >
                            {link.icon && <span className="opacity-60 group-hover:text-red-500 transition-colors shrink-0">{link.icon}</span>}
                            <span className="relative truncate">
                              {link.text}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                          </a>
                        ) : (
                          <div className="flex items-start justify-center md:justify-start gap-3 text-sm md:text-base font-bold text-zinc-500 dark:text-zinc-500">
                            <span className="mt-1 opacity-60 text-red-500 shrink-0">{link.icon}</span>
                            <span className="leading-relaxed text-left md:text-left">{link.text}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Big Logo (Right) */}
            <div className="flex items-center justify-center w-full lg:w-auto lg:justify-end shrink-0 pt-8 lg:pt-0 border-t lg:border-t-0 border-red-100/30 dark:border-white/5">
              <img 
                src={isDark ? logoDark : logoLight} 
                alt="Logo" 
                loading="lazy"
                decoding="async"
                className="h-12 md:h-20 lg:h-24 w-auto object-contain transition-all duration-500 opacity-60 md:opacity-80 hover:opacity-100 hover:scale-105 drop-shadow-2xl" 
              />
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className={`pt-8 border-t border-red-100/50 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left ${isWelcome ? 'mt-0' : 'mt-12'}`}>
          <p className="text-[12px] md:text-sm font-bold text-zinc-400 dark:text-zinc-600 flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <span>© {currentYear} Gudupao Spark Inc.</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-red-500/40"></span>
            <span>All rights reserved.</span>
          </p>

          
          <button
            onClick={toggleLang}
            className="group flex items-center gap-2 px-6 md:px-4 py-3 md:py-2 rounded-full bg-white dark:bg-white/5 border border-red-100 dark:border-white/10 hover:border-red-200 dark:hover:border-white/20 hover:shadow-lg hover:shadow-red-500/5 active:scale-95 transition-all duration-300 text-zinc-600 dark:text-zinc-300"
          >
            <Languages size={16} className="group-hover:rotate-12 transition-transform text-red-500" />
            <span className="text-xs font-black tracking-widest uppercase">{i18n.language.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
