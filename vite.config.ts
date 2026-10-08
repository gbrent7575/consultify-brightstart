import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// During SSR/SSG, swap the auto-generated Supabase client (which touches
// `localStorage` at module load) for an inert stub. Forms only call supabase
// at submit time, so prerendered pages never hit it.
const SUPABASE_CLIENT_PATH = path.resolve(
  __dirname,
  "./src/integrations/supabase/client.ts",
);
const SUPABASE_SSR_STUB = path.resolve(
  __dirname,
  "./src/integrations/supabase/client.ssr.ts",
);

const ssrSupabaseStub = (): PluginOption => ({
  name: "ssr-supabase-stub",
  enforce: "pre",
  async resolveId(source, importer, options) {
    if (!options?.ssr) return null;
    const resolved = await this.resolve(source, importer, {
      ...options,
      skipSelf: true,
    });
    if (resolved && path.resolve(resolved.id) === SUPABASE_CLIENT_PATH) {
      return SUPABASE_SSR_STUB;
    }
    return null;
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    ssrSupabaseStub(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // react-helmet-async stays external during SSR so vite-react-ssg's
  // HelmetProvider and our <Helmet> usage share one module instance/context.
  ssgOptions: {
    script: "async",
    formatting: "minify",
    crittersOptions: false,
    // Emit each route as <route>/index.html so static hosts serve the
    // prerendered HTML for clean URLs (e.g. /pricing -> pricing/index.html)
    // instead of falling back to the SPA index.html.
    dirStyle: "nested",
    // Append /owners pages to the built sitemap. Never fails the build.
    async onFinished(dir: string) {
      try {
        const res = await fetch(
          "https://mtsfjulztuhezppqfydr.supabase.co/functions/v1/owner-engine?action=pages",
        );
        const json = (await res.json()) as { ok?: boolean; pages?: { slug: string; live_since?: string; noindex?: boolean }[] };
        const pages: { slug: string; live_since?: string; noindex?: boolean }[] =
          json?.ok && Array.isArray(json.pages) ? json.pages : [];
        if (pages.length === 0) return;
        const base = "https://contractorcompliancepros.com";
        const entry = (loc: string, lastmod?: string) =>
          `  <url>\n    <loc>${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
        let xml = entry(`${base}/owners`);
        for (const p of pages.filter((page) => !page.noindex)) {
          xml += entry(`${base}/owners/${p.slug}`, p.live_since?.slice(0, 10));
        }
        const fs = await import("node:fs/promises");
        const file = path.join(dir, "sitemap.xml");
        const current = await fs.readFile(file, "utf8");
        await fs.writeFile(file, current.replace("</urlset>", `${xml}</urlset>`));
      } catch (e) {
        console.warn("[sitemap] owner pages skipped:", e);
      }
    },
  },
}));
