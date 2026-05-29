export interface GainEntry {
  balance: number;
  gain: number;
}

export interface HoldingApi {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainEntry;
  ltcg: GainEntry;
}

export interface Holding extends HoldingApi {
  id: string;
}

export interface TaxCategory {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: TaxCategory;
  ltcg: TaxCategory;
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}
