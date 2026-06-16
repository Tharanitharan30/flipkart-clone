import { ShieldCheck } from "lucide-react";

export function DiscountBadge({ pct }: { pct: number }) {
  if (pct <= 0) return null;
  return (
    <span className="inline-block rounded bg-fk-green/10 px-1.5 py-0.5 text-xs font-semibold text-fk-green">
      {pct}% off
    </span>
  );
}

export function AssuredBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-fk-blue">
      <ShieldCheck className="h-3 w-3" />
      Assured
    </span>
  );
}
