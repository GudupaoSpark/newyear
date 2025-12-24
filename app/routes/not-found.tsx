import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4">
        404
      </h1>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {t("error.notFound") || "Page Not Found"}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md">
        {t("error.notFoundDesc") || "The page you are looking for doesn't exist or has been moved."}
      </p>
      <Link
        to="/"
        className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-red-500/30"
      >
        {t("error.goHome") || "Go Home"}
      </Link>
    </div>
  );
}
