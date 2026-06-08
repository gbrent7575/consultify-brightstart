// SSR/SSG polyfills — must be imported before any module that touches browser globals.
// The auto-generated Supabase client references `localStorage` at module load.

if (typeof globalThis.localStorage === "undefined") {
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
  // @ts-expect-error - assigning to global
  globalThis.localStorage = storage;
  // @ts-expect-error - assigning to global
  globalThis.sessionStorage = storage;
}
