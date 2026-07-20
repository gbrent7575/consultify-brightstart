import { useState, useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface Props {
  storageKey: string;
  children: ReactNode;
}

const HeroSupportNotice = ({ storageKey, children }: Props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === "1") setVisible(false);
    } catch {}
  }, [storageKey]);

  if (!visible) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {}
    setVisible(false);
  };

  return (
    <div className="mt-4 mb-2 flex items-start gap-3 rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 text-sm text-primary-foreground/80">
      <p className="flex-1 leading-relaxed">{children}</p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss notice"
        className="flex-shrink-0 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default HeroSupportNotice;
