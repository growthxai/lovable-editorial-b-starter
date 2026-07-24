import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Local-dev OAuth shim — makes "Sign in with Google/Apple" work on the local server.
 *
 * Lovable's managed OAuth broker lives at `oauth.lovable.app` and is edge-fronted on
 * every `*.lovable.app` domain as `/~oauth/initiate` — but that path 404s on a local
 * dev server. This middleware reproduces the edge worker with a **302 redirect** (NOT a
 * proxy: the broker sets a `__Host-` CSRF cookie that requires the real HTTPS origin,
 * so proxying breaks callback state validation).
 *
 * Enable it by setting `LOVABLE_PROJECT_ID` (and optionally `LOVABLE_PROJECT_ENV` =
 * `dev` | `prod`) in `.env`; without it the shim is inert. The project's OAuth
 * allow-list must include `http://127.0.0.1:8080/**` (the pipeline / Lovable configures
 * this). IMPORTANT: open the app at **http://127.0.0.1:8080** — the broker rejects the
 * `localhost` hostname. See docs/design/auth-and-navigation.md.
 */
function lovableOAuthShim(projectId: string, projectEnv: string): Plugin {
  return {
    name: "lovable-oauth-shim",
    configureServer(server) {
      server.middlewares.use("/~oauth/initiate", (req, res) => {
        const incoming = new URL(req.url ?? "", "http://127.0.0.1");
        incoming.searchParams.set("project_id", projectId);
        if (projectEnv) incoming.searchParams.set("project_env", projectEnv);
        res.statusCode = 302;
        res.setHeader(
          "Location",
          `https://oauth.lovable.app/initiate?${incoming.searchParams.toString()}`,
        );
        res.end();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const projectId = env.LOVABLE_PROJECT_ID ?? "";
  const projectEnv = env.LOVABLE_PROJECT_ENV ?? "";

  const plugins: Plugin[] = [react()];
  if (mode === "development") {
    const tagger = componentTagger();
    if (tagger) plugins.push(tagger as Plugin);
  }
  if (projectId) plugins.push(lovableOAuthShim(projectId, projectEnv));

  return {
    server: {
      // 127.0.0.1, NOT "::"/localhost — Lovable's OAuth broker only allow-lists the
      // 127.0.0.1 host for local dev; `localhost` is permanently rejected.
      host: "127.0.0.1",
      port: 8080,
      strictPort: true,
      hmr: {
        overlay: false,
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
