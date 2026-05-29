import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GainBadge from "./GainBadge";
import {
  formatCurrency,
  formatHoldingAmount,
  formatNumber,
  formatRatePerCoin,
} from "@/lib/formatters";
import { useHarvestStore } from "@/store/useHarvestStore";

const VISIBLE_ROWS = 5;

export default function HoldingsTable() {
  const { holdings, selectedHoldings, toggleHolding, selectAll, clearSelection } =
    useHarvestStore();
  const [showAll, setShowAll] = useState(false);

  const isSelected = (id: string) =>
    selectedHoldings.some((h) => h.id === id);

  const allSelected =
    holdings.length > 0 &&
    holdings.every((holding) =>
      selectedHoldings.some((selected) => selected.id === holding.id),
    );

  const visibleHoldings = showAll ? holdings : holdings.slice(0, VISIBLE_ROWS);

  return (
    <div className="rounded-sm border border-border bg-harvest-surface text-harvest-surface-foreground">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold">Holdings</h2>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) =>
                    checked ? selectAll() : clearSelection()
                  }
                  className="data-checked:border-harvest-blue data-checked:bg-harvest-blue data-checked:text-white"
                />
              </TableHead>
              <TableHead className="min-w-[180px] sm:min-w-[220px]">Asset</TableHead>
              <TableHead>
                <div>Holdings</div>
                <div className="text-xs font-normal text-harvest-surface-foreground/50">
                  Current Market Rate
                </div>
              </TableHead>
              <TableHead>Total Current Value</TableHead>
              <TableHead>Short-term</TableHead>
              <TableHead>Long-Term</TableHead>
              <TableHead>Amount to Sell</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {visibleHoldings.map((holding) => {
              const selected = isSelected(holding.id);
              const totalValue = holding.totalHolding * holding.currentPrice;

              return (
                <TableRow
                  key={holding.id}
                  className={`border-border ${
                    selected
                      ? "bg-harvest-row-selected hover:bg-harvest-row-selected"
                      : "hover:bg-muted/30"
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selected}
                      onCheckedChange={() => toggleHolding(holding)}
                      className="data-checked:border-harvest-blue data-checked:bg-harvest-blue data-checked:text-white"
                    />
                  </TableCell>

                  <TableCell className="whitespace-normal">
                    <div className="flex items-center gap-3">
                      <img
                        src={holding.logo}
                        alt={holding.coin}
                        className="size-9 rounded-full shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium break-words leading-tight">{holding.coinName}</p>
                        <p className="text-xs text-harvest-surface-foreground/50">
                          {holding.coin}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="font-medium">
                      {formatHoldingAmount(holding.totalHolding, holding.coin)}
                    </p>
                    <p className="text-xs text-harvest-surface-foreground/50">
                      {formatRatePerCoin(holding.currentPrice, holding.coin)}
                    </p>
                  </TableCell>

                  <TableCell className="font-medium">
                    {formatCurrency(totalValue)}
                  </TableCell>

                  <TableCell>
                    <GainBadge value={holding.stcg.gain} />
                    <p className="mt-0.5 text-xs text-harvest-surface-foreground/50">
                      {formatNumber(holding.stcg.balance)} {holding.coin}
                    </p>
                  </TableCell>

                  <TableCell>
                    <GainBadge value={holding.ltcg.gain} />
                    <p className="mt-0.5 text-xs text-harvest-surface-foreground/50">
                      {formatNumber(holding.ltcg.balance)} {holding.coin}
                    </p>
                  </TableCell>

                  <TableCell>
                    {selected ? (
                      <span className="font-medium">
                        {formatHoldingAmount(
                          holding.totalHolding,
                          holding.coin,
                        )}
                      </span>
                    ) : (
                      <span className="text-harvest-surface-foreground/40">
                        -
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {holdings.length > VISIBLE_ROWS && (
        <div className="border-t border-border px-6 py-3">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm font-medium text-harvest-link hover:underline"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        </div>
      )}
    </div>
  );
}
