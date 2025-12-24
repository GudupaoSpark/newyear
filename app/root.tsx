import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import "./i18n/config";
import Navbar from "./components/Navbar";
import { useTranslation } from "react-i18next";
import { useEffect, lazy, Suspense } from "react";
import favicon from "./assets/favicon.ico";

const Footer = lazy(() => import("./components/Footer"));

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://simpleicons.org" },
  { rel: "dns-prefetch", href: "https://simpleicons.org" },
  { rel: "icon", type: "image/x-icon", href: favicon },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const params = useParams();
  
  // Normalize language for attributes to avoid hydration mismatch (e.g., en-US vs en)
  const currentLang = i18n.language?.split('-')[0] || "zh";

  useEffect(() => {
    if (params.lang) {
      // 规范化语言代码，例如 en-US -> en
      const normalizedLang = params.lang.split('-')[0];
      
      if (normalizedLang === "zh" || normalizedLang === "en") {
        if (i18n.language !== normalizedLang) {
          i18n.changeLanguage(normalizedLang);
        }
      }
    }
  }, [params.lang, i18n]);
  
  return (
    <html lang={currentLang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
        <Suspense fallback={<div className="h-20" />}>
          <Footer />
        </Suspense>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation();
  let message = t("error.oops");
  let details = t("error.unexpected");
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : t("error.status");
    details =
      error.status === 404
        ? t("error.notFound")
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
