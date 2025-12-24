import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/redirect.tsx"),
  route(":lang", "routes/home.tsx"),
  route(":lang/welcome", "welcome/welcome.tsx"),
  // Catch-all route for 404s
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
