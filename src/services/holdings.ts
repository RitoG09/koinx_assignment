import { holdingsData } from "@/mockData/holdings";
import type { Holding } from "@/types";

export const fetchHoldings = async () => {
  return new Promise<Holding[]>((resolve) => {
    setTimeout(() => {
      const dataWithIds = holdingsData.map((holding, index) => ({
        ...holding,
        id: `${holding.coin}-${index}`,
      }));
      resolve(dataWithIds);
    }, 800);
  });
};
