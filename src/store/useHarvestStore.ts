import { create } from "zustand";
import type { CapitalGains, Holding } from "@/types";

interface HarverstStore {
  holdings: Holding[];
  selectedHoldings: Holding[];
  capitalGains: CapitalGains | null;
  selectedIds: string[];
  setHoldings: (holdings: Holding[]) => void;
  setCapitalGains: (gains: CapitalGains) => void;
  toggleHolding: (holding: Holding) => void;
  selectAll: () => void;
  clearSelection: () => void;
}

export const useHarvestStore = create<HarverstStore>((set, get) => ({
  holdings: [],
  selectedHoldings: [],
  capitalGains: null,
  selectedIds: [],
  setHoldings: (holdings) =>
    set({
      holdings: holdings.map((holding, index) => ({
        ...holding,
        id: `${holding.coin}-${index}`,
      })),
    }),
  setCapitalGains: (capitalGains) => set({ capitalGains }),
  toggleHolding: (holding) => {
    const exists = get().selectedHoldings.some((h) => h.id === holding.id);
    if (exists) {
      set({
        selectedHoldings: get().selectedHoldings.filter(
          (h) => h.id !== holding.id,
        ),
      });
    } else {
      set({
        selectedHoldings: [...get().selectedHoldings, holding],
      });
    }
  },

  selectAll: () => {
    set({
      selectedHoldings: get().holdings,
    });
  },

  clearSelection: () => {
    set({
      selectedHoldings: [],
    });
  },
}));
