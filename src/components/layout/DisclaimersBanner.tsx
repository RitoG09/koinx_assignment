import { ChevronDown, Info } from "lucide-react";
import { useState } from "react";

export default function DisclaimersBanner() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-sm border border-harvest-banner-border bg-harvest-banner">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-harvest-banner-foreground"
      >
        <Info className="size-4 shrink-0" />
        <span className="flex-1">Important Notes & Disclaimers</span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-harvest-banner-border px-2 py-1 text-sm text-harvest-banner-foreground/80">
          <ul className="list-disc pl-5 space-y-2.5 leading-relaxed">
            <li>
              Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions,
            </li>
            <li>
              Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.
            </li>
            <li>
              Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.
            </li>
            <li>
              Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.
            </li>
            <li>
              Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
