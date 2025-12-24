import { redirect } from "react-router";
import type { Route } from "./+types/redirect";
import i18n from "../i18n/config";

export function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const lang = i18n.language || "zh";
  return redirect(`/${lang}${url.pathname === "/" ? "" : url.pathname}`);
}

export default function Redirect() {
  return null;
}
