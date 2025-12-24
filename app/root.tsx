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

const Footer = lazy(() => import("./components/Footer"));

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://simpleicons.org" },
  { rel: "dns-prefetch", href: "https://simpleicons.org" },
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  {
    rel: "preload",
    href: "/fonts/PlusJakartaSans-Variable.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const params = useParams();

  useEffect(() => {
    if (params.lang && (params.lang === "zh" || params.lang === "en")) {
      if (i18n.language !== params.lang) {
        i18n.changeLanguage(params.lang);
      }
    }
  }, [params.lang, i18n]);
  
  return (
    <html lang={i18n.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
