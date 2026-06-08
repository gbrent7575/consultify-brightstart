import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Polyfill injected at the very top of the SSR bundle so it runs before any
// hoisted ESM imports evaluate (the Supabase client touches `localStorage` on import).
const SSR_BANNER = `
if (typeof globalThis.localStorage === 'undefined') {
  const __m = new Map();
  const __s = {
    get length(){return __m.size},
    clear(){__m.clear()},
    getItem(k){return __m.has(k)?__m.get(k):null},
    key(i){return Array.from(__m.keys())[i] ?? null},
    removeItem(k){__m.delete(k)},
    setItem(k,v){__m.set(k,String(v))},
  };
  globalThis.localStorage = __s;
  globalThis.sessionStorage = __s;
}
`.trim();

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: isSsrBuild
    ? {
        rollupOptions: {
          output: { banner: SSR_BANNER },
        },
      }
    : {},
  ssgOptions: {
    script: "async",
    formatting: "minify",
    crittersOptions: false,
  },
}));
