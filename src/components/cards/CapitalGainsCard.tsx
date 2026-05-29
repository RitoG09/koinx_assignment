import type { CapitalGains } from "@/types";
import { formatCurrency, formatLoss } from "@/lib/formatters";
import { useCapitalGainMetrics } from "@/hooks/useCapitalGainMetrics";

interface Props {
  title: string;
  capitalGains: CapitalGains;
  savings?: number;
  variant?: "default" | "harvested";
  finalGainLabel?: string;
}

function GainsGrid({
  capitalGains,
  netSTCG,
  netLTCG,
  inverted,
}: {
  capitalGains: CapitalGains;
  netSTCG: number;
  netLTCG: number;
  inverted?: boolean;
}) {
  const labelClass = inverted
    ? "text-white/70"
    : "text-harvest-surface-foreground/70";
  const valueClass = inverted ? "text-white" : "text-harvest-surface-foreground";
  const headerClass = inverted
    ? "text-white/80"
    : "text-harvest-surface-foreground/60";

  const rows = [
    {
      label: "Profits",
      short: formatCurrency(capitalGains.stcg.profits),
      long: formatCurrency(capitalGains.ltcg.profits),
    },
    {
      label: "Losses",
      short: formatLoss(capitalGains.stcg.losses),
      long: formatLoss(capitalGains.ltcg.losses),
    },
    {
      label: "Net Capital Gains",
      short: formatCurrency(netSTCG),
      long: formatCurrency(netLTCG),
      bold: true,
    },
  ];

  return (
    <div className="space-y-3">
      <div
        className={`grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-1 text-sm ${headerClass}`}
      >
        <span />
        <span className="min-w-[5.5rem] text-right">Short-term</span>
        <span className="min-w-[5.5rem] text-right">Long-term</span>
      </div>

      {rows.map((row) => (
        <div
          key={row.label}
          className={`grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-1 text-sm ${row.bold ? "font-semibold" : ""}`}
        >
          <span className={labelClass}>{row.label}</span>
          <span className={`min-w-[5.5rem] text-right ${valueClass}`}>
            {row.short}
          </span>
          <span className={`min-w-[5.5rem] text-right ${valueClass}`}>
            {row.long}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CapitalGainsCard({
  title,
  capitalGains,
  savings,
  variant = "default",
  finalGainLabel,
}: Props) {
  const { netSTCG, netLTCG, totalCapitalGains } =
    useCapitalGainMetrics(capitalGains);

  const isHarvested = variant === "harvested";

  return (
    <div
      className={`rounded-sm p-6 ${
        isHarvested
          ? "bg-harvest-blue text-white"
          : "border border-border bg-harvest-surface text-harvest-surface-foreground"
      }`}
    >
      <h2 className="mb-6 text-lg font-semibold">{title}</h2>

      <GainsGrid
        capitalGains={capitalGains}
        netSTCG={netSTCG}
        netLTCG={netLTCG}
        inverted={isHarvested}
      />

      <div
        className={`mt-6 flex flex-wrap items-baseline justify-between gap-2 border-t pt-5 ${
          isHarvested ? "border-white/20" : "border-border"
        }`}
      >
        <span className="text-sm font-medium">{finalGainLabel}:</span>
        <span className="text-2xl font-bold">
          {formatCurrency(totalCapitalGains)}
        </span>
      </div>

      {isHarvested && savings != null && savings > 0 && (
        <p className="mt-4 text-sm text-white/90">
          🎉 You are going to save upto {formatCurrency(savings)}
        </p>
      )}
    </div>
  );
}
