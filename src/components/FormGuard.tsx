import { useState } from "react";

export const MIN_SUBMIT_MS = 3000;

export const hasTenDigits = (v: string) => v.replace(/\D/g, "").length >= 10;
export const PHONE_ERROR = "Please enter a phone number with at least 10 digits";

/** Shared spam gate + newsletter opt-in state for every quote form. */
export const useFormGuard = () => {
  const [website, setWebsite] = useState("");
  const [briefOptIn, setBriefOptIn] = useState(false);
  const [renderedAt] = useState(() => Date.now());
  const elapsed = () => Date.now() - renderedAt;
  return {
    website,
    setWebsite,
    briefOptIn,
    setBriefOptIn,
    isBot: () => website.length > 0 || elapsed() < MIN_SUBMIT_MS,
    extras: () => ({ website, elapsed_ms: elapsed(), brief_opt_in: briefOptIn }),
    resetGuard: () => setBriefOptIn(false),
  };
};

export const HoneypotField = ({ value, onChange, id = "website" }: { value: string; onChange: (v: string) => void; id?: string }) => (
  <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
    <label htmlFor={id}>Website</label>
    <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export const BriefOptIn = ({ checked, onChange, id = "brief_opt_in" }: { checked: boolean; onChange: (v: boolean) => void; id?: string }) => (
  <label htmlFor={id} className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-0.5 h-4 w-4 accent-[hsl(var(--accent))]"
    />
    <span>Also send me the Monthly Safety Brief (free monthly toolbox talk)</span>
  </label>
);
