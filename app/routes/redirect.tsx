import { redirect } from "react-router";
import type { Route } from "./+types/redirect";
import i18n from "../i18n/config";

export function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  // 获取 i18n 语言，如果不是 zh 或 en，则默认为 zh
  let lang = i18n.language;
  
  // 处理可能出现的 en-US 等情况，只保留主语言标签
  if (lang && lang.includes('-')) {
    lang = lang.split('-')[0];
  }
  
  if (!lang || !['zh', 'en'].includes(lang)) {
    lang = 'zh';
  }
  
  return redirect(`/${lang}${url.pathname === "/" ? "" : url.pathname}`);
}

export default function Redirect() {
  return null;
}
