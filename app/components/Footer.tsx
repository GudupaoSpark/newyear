import { Mail, MapPin, Languages, Activity } from "lucide-react";
import { useEffect, useState } from "react";

// Import logos
import logoLight from "../assets/logo/logo.png";
import logoDark from "../assets/logo/logo-dark.png";

export default function Footer() {
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

  const [lang, setLang] = useState("EN");
  const toggleLang = () => setLang(l => l === "EN" ? "ZH" : "EN");

  const socialIcons = [
    { 
      icon: (
        <div className="p-1 rounded-xl border-2 border-zinc-400 dark:border-zinc-500">
          <Activity size={20} className="text-zinc-400 dark:text-zinc-500" />
        </div>
      ), 
      href: "https://status.gudupao.top/", 
      label: "Status" 
    },
    { icon: <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 mx-4" />, href: undefined, label: "separator" },
    { icon: <img src="https://simpleicons.org/icons/x.svg" className="w-6 h-6 dark:invert opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" alt="X" />, href: "https://x.com/GudupaoSpark", label: "X" },
    { 
      icon: (
        <div className="bg-zinc-400 dark:bg-zinc-500 rounded-full p-1">
          <img src="https://simpleicons.org/icons/github.svg" className="w-5 h-5 invert dark:invert-0" alt="GitHub" />
        </div>
      ), 
      href: "https://github.com/GudupaoSpark", 
      label: "GitHub" 
    },
    { icon: <img src="https://simpleicons.org/icons/youtube.svg" className="w-8 h-8 dark:invert opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" alt="YouTube" />, href: "https://www.youtube.com/@GudupaoSpark", label: "YouTube" },
    { icon: <img src="https://simpleicons.org/icons/bilibili.svg" className="w-6 h-6 dark:invert opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" alt="Bilibili" />, href: "https://space.bilibili.com/1016857888", label: "Bilibili" },
    { 
      icon: (
        <svg viewBox="0 0 1024 1024" className="w-6 h-6 fill-zinc-400 dark:fill-zinc-500 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" xmlns="http://www.w3.org/2000/svg">
          <path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" />
        </svg>
      ), 
      href: "https://qm.qq.com/q/B3vKejsGBi", 
      label: "QQ" 
    },
    { icon: <img src="https://simpleicons.org/icons/discord.svg" className="w-6 h-6 dark:invert opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" alt="Discord" />, href: "https://discord.gg/SC78fv3ZRF", label: "Discord" },
  ];

  const footerSections: {
    title: string;
    links: { text: string; href?: string; icon?: React.ReactNode }[];
  }[] = [
    {
      title: "Company",
      links: [
        { text: "About", href: "https://gudupao.top/about" },
        { text: "Projects", href: "https://gudupao.top/projects" },
        { text: "Contact", href: "https://gudupao.top/contact" }
      ]
    },
    {
      title: "Follow Us",
      links: [
        { text: "X (Twitter)", href: "https://x.com/GudupaoSpark" },
        { text: "GitHub", href: "https://github.com/GudupaoSpark" },
        { text: "YouTube", href: "https://www.youtube.com/@GudupaoSpark" },
        { text: "Bilibili", href: "https://space.bilibili.com/1016857888" },
        { text: "QQ Group", href: "https://qm.qq.com/q/B3vKejsGBi" },
        { text: "Discord", href: "https://discord.gg/SC78fv3ZRF" }
      ]
    },
    {
      title: "Contact Info",
      links: [
        { text: "official@gudupao.top", icon: <Mail size={14} className="text-blue-500" />, href: "mailto:official@gudupao.top" },
        { text: "Guangdong Province, Guangzhou, China", icon: <MapPin size={14} className="text-blue-500" /> }
      ]
    }
  ];

  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t-2 border-zinc-100 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        
        {/* Top Section: Socials Only */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {socialIcons.map((social, i) => (
            social.href ? (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ) : (
              <div key={i} className="px-1 select-none">
                {social.icon}
              </div>
            )
          ))}
        </div>

        {/* Main Content: Links & Big Logo */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-8">
          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-0 flex-1 w-full max-w-2xl">
            {/* Navigation Sections */}
            {footerSections.map((section, i) => (
              <div key={i} className="flex flex-col gap-2">
                <h4 className="text-base font-black text-zinc-900 dark:text-zinc-100 mb-0.5">
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-0.5">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      {link.href ? (
                        <a 
                          href={link.href}
                          target={link.href.startsWith('http') ? "_blank" : undefined}
                          rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-3 text-base font-bold text-zinc-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                          {link.icon && <span className="opacity-60">{link.icon}</span>}
                          <span>{link.text}</span>
                        </a>
                      ) : (
                        <div className="flex items-start gap-3 text-base font-bold text-zinc-400 dark:text-zinc-500">
                          <span className="mt-1.5 opacity-60">{link.icon}</span>
                          <span className="leading-relaxed">{link.text}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Big Logo (Right) */}
          <div className="flex items-start justify-start lg:justify-end shrink-0">
            <img 
              src={isDark ? logoDark : logoLight} 
              alt="Logo" 
              className="h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-500 opacity-90 hover:opacity-100" 
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-8 border-t border-zinc-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-base font-bold text-zinc-400 dark:text-zinc-600">
            © {currentYear} Gudupao Spark Inc. All rights reserved.
          </p>
          
          <button
            onClick={toggleLang}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 transition-all duration-300 text-zinc-700 dark:text-zinc-300"
          >
            <Languages size={16} className="group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-black tracking-tighter uppercase">{lang}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
