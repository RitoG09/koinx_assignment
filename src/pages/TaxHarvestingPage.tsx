import { useEffect } from "react";

import CapitalGainsCard from "@/components/cards/CapitalGainsCard";
import DisclaimersBanner from "@/components/layout/DisclaimersBanner";
import Header from "@/components/layout/Header";
import HoldingsTable from "@/components/table/HoldingsTable";

import { fetchHoldings } from "@/services/holdings";
import { fetchCapitalGains } from "@/services/capitalGains";

import { useHarvestStore } from "@/store/useHarvestStore";
import { applyHarvesting, calculateRealisedGains } from "@/lib/calculations";

export default function TaxHarvestingPage() {
  const { capitalGains, selectedHoldings, setHoldings, setCapitalGains } =
    useHarvestStore();

  useEffect(() => {
    async function loadData() {
      const holdingsData = await fetchHoldings();
      const gainsData = await fetchCapitalGains();
      setHoldings(holdingsData);
      setCapitalGains(gainsData.capitalGains);
    }

    loadData();
  }, [setHoldings, setCapitalGains]);

  if (!capitalGains) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center p-20 text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  const afterHarvestData = applyHarvesting(capitalGains, selectedHoldings);
  const preHarvestValue = calculateRealisedGains(capitalGains);
  const postHarvestValue = calculateRealisedGains(afterHarvestData);
  const savings =
    preHarvestValue > postHarvestValue ? preHarvestValue - postHarvestValue : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:px-8">
        <section className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Tax Harvesting
          </h1>
          <a
            href="#how-it-works"
            className="text-sm text-harvest-link underline-offset-4 hover:underline"
          >
            How it works?
          </a>
        </section>

        <DisclaimersBanner />

        <section className="grid gap-6 lg:grid-cols-2">
          <CapitalGainsCard
            title="Pre Harvesting"
            finalGainLabel="Realised Capital Gains"
            capitalGains={capitalGains}
          />

          <CapitalGainsCard
            title="After Harvesting"
            finalGainLabel="Effective Capital Gains"
            capitalGains={afterHarvestData}
            savings={savings}
            variant="harvested"
          />
        </section>

        <HoldingsTable />
      </main>
    </div>
  );
}
