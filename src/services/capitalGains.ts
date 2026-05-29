import { capitalGainsData } from "@/mockData/capitalGains";
import type { CapitalGainsResponse } from "@/types";

export async function fetchCapitalGains() {
  return new Promise<CapitalGainsResponse>((resolve) => {
    setTimeout(() => {
      resolve(capitalGainsData);
    }, 800);
  });
}