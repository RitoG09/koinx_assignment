import { type CapitalGains, type Holding } from "@/types";

export const calculateNetGain = (profits: number, losses: number) => {
  return profits - losses;
};

export const calculateRealisedGains = (capitalGains: CapitalGains) => {
  const stcg = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const ltcg = capitalGains.ltcg.profits - capitalGains.ltcg.losses;

  return stcg + ltcg;
};

export const applyHarvesting = (
  baseGains: CapitalGains,
  selectedHoldings: Holding[],
): CapitalGains => {
  const updated = structuredClone(baseGains);

  selectedHoldings.forEach((holding) => {
    const stcgGain = holding.stcg.gain;
    const ltcgGain = holding.ltcg.gain;

    if (stcgGain > 0) {
      updated.stcg.profits += stcgGain;
    } else {
      updated.stcg.losses += Math.abs(stcgGain);
    }

    if (ltcgGain > 0) {
      updated.ltcg.profits += ltcgGain;
    } else {
      updated.ltcg.losses += Math.abs(ltcgGain);
    }
  });
  return updated;
};
