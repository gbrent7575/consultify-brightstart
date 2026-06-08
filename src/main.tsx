// SSR/SSG polyfills must run before any module that touches browser globals
// (the auto-generated Supabase client references `localStorage` at load time).
(() => {
  const g = globalThis as unknown as {
    localStorage?: Storage;
    sessionStorage?: Storage;
  };
  if (typeof g.localStorage !== "undefined") return;
  const memory = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return memory.size;
    },
    clear: () => memory.clear(),
    getItem: (k) => (memory.has(k) ? memory.get(k)! : null),
    key: (i) => Array.from(memory.keys())[i] ?? null,
    removeItem: (k) => void memory.delete(k),
    setItem: (k, v) => void memory.set(k, String(v)),
  };
  g.localStorage = storage;
  g.sessionStorage = storage;
})();

import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

export const createRoot = ViteReactSSG({ routes });
