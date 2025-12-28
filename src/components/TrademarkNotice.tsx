import { Info } from "lucide-react";

interface TrademarkNoticeProps {
  variant?: "default" | "footer";
  className?: string;
}

/**
 * TrademarkNotice - Reusable component for ISNetworld trademark compliance
 * 
 * Use this component near any section that markets ISNetworld-related services.
 * 
 * Variants:
 * - "default": Standard callout for service sections (border + background)
 * - "footer": Smaller text suitable for footer placement
 */
const TrademarkNotice = ({ variant = "default", className = "" }: TrademarkNoticeProps) => {
  const disclaimer = "Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise affiliated with ISNetworld® or ISN Software Corporation.";
  const attribution = "ISNetworld® is a registered trademark of ISN Software Corporation.";

  if (variant === "footer") {
    return (
      <div className={`text-xs text-primary-foreground/50 ${className}`}>
        <p className="mb-1">{disclaimer}</p>
        <p>{attribution}</p>
      </div>
    );
  }

  return (
    <div className={`bg-muted/50 border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">{disclaimer}</p>
          <p className="text-xs">{attribution}</p>
        </div>
      </div>
    </div>
  );
};

export default TrademarkNotice;
