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
  },
}));
