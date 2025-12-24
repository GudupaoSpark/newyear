import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/redirect.tsx"),
  route(":lang", "routes/home.tsx"),
  route(":lang/welcome", "welcome/welcome.tsx"),
] satisfies RouteConfig;
