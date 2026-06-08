// SSR stub for the Supabase client. The real client touches `localStorage`
// at module load, which doesn't exist during static rendering. Forms only
// call into supabase at submit time, so an inert stub is safe for SSG.
const noop = () => {
  throw new Error("Supabase client unavailable during SSR/SSG");
};

export const supabase = new Proxy(
  {},
  {
    get() {
      return noop;
    },
  },
) as never;
