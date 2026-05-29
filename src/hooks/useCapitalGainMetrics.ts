import type { CapitalGains } from "@/types";

export function useCapitalGainMetrics(gains: CapitalGains) {
  const netSTCG = gains.stcg.profits - gains.stcg.losses;
  const netLTCG = gains.ltcg.profits - gains.ltcg.losses;
  const totalCapitalGains = netSTCG + netLTCG;

  return {
    netSTCG,
    netLTCG,
    totalCapitalGains,
  };
}
