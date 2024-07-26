import { PriceProps } from "@/shared/components/shared/filters";
import { create } from "zustand";

type QueryFilters = {
  pizzaTypes: string[] | [];
  ingredients: string[] | [];
  sizes: string[] | [];
  priceFrom?: number;
  priceTo?: number;
};

type State = {
  activeFilters: QueryFilters;
  setActiveFilters: (activeFilters: QueryFilters) => void;
  deleteActiveFilter: (params: keyof QueryFilters) => void;
  //   deleteAllFilters: () => void;
};

export const useFilterStore = create<State>()((set, get) => ({
  activeFilters: {
    pizzaTypes: [],
    ingredients: [],
    sizes: [],
    priceFrom: undefined,
    priceTo: undefined,
  },
  setActiveFilters: (activeFilters: QueryFilters) => set({ activeFilters }),
  deleteActiveFilter: (params: keyof QueryFilters) => {
    const updateFilters = { ...get().activeFilters };
    if (params in updateFilters) {
      const valuesFilters = get().activeFilters[params];

      if (Array.isArray(valuesFilters)) {
        //@ts-ignore
        updateFilters[params] = [];
      } else {
        //@ts-ignore
        updateFilters[params] = undefined;
      }

      set({ activeFilters: updateFilters });
    }
  },
}));
