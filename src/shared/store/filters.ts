import { PriceProps } from "@/shared/components/shared/filters";
import { create } from "zustand";

export type QueryFilters = {
  pizzaTypes: string[] | [];
  ingredients: string[] | [];
  sizes: string[] | [];
  price: PriceProps;
};

type State = {
  filterParams: QueryFilters;
  updatePrice: (name: keyof PriceProps, value: number) => void;
  setFiltersParams: (
    value: string | PriceProps,
    name: keyof QueryFilters
  ) => void;

  deleteActiveFilter: (name: keyof QueryFilters) => void;
  deleteAllFilters: () => void;
};

export const useFilterStore = create<State>()((set, get) => ({
  filterParams: {
    price: {
      priceFrom: undefined,
      priceTo: undefined,
    },
    sizes: [],
    ingredients: [],
    pizzaTypes: [],
  },

  // setPizzaTypes: (id: string) => {
  //   const currentPizzaTypes = get().pizzaTypes;

  //   !currentPizzaTypes.includes(id as never)
  //     ? set({ pizzaTypes: [...currentPizzaTypes, id] })
  //     : set({
  //         pizzaTypes: [...currentPizzaTypes.filter((item) => item !== id)],
  //       });
  // }, // можно сделать так для каждого фильтра

  setFiltersParams: (value: string | PriceProps, name: keyof QueryFilters) => {
    const updateFilterValues = get().filterParams;
    const currFilterValue = get().filterParams[name];

    if (name === "price" && typeof value === "object") {
      set({ filterParams: { ...updateFilterValues, price: value } });
    }

    if (
      typeof value === "string" &&
      Array.isArray(currFilterValue) &&
      !currFilterValue.includes(value as never)
    ) {
      set({
        filterParams: {
          ...updateFilterValues,
          [name]: [...currFilterValue, value],
        },
      });
    }

    if (
      typeof value === "string" &&
      Array.isArray(currFilterValue) &&
      currFilterValue.includes(value as never)
    ) {
      set({
        filterParams: {
          ...updateFilterValues,
          [name]: [...currFilterValue.filter((item) => item !== value)],
        },
      });
    }
  },

  updatePrice: (name: keyof PriceProps, value: number) => {
    const currentFilterValue = get().filterParams;
    set({
      filterParams: {
        ...currentFilterValue,
        price: { ...currentFilterValue["price"], [name]: value },
      },
    });
  },

  deleteActiveFilter: (name: keyof QueryFilters) => {
    const updateFilterValues = get().filterParams;
    const currFilterValue = get().filterParams[name];

    if (Array.isArray(currFilterValue)) {
      set({
        filterParams: {
          ...updateFilterValues,
          [name]: [],
        },
      });
    } else {
      set({
        filterParams: {
          ...updateFilterValues,
          ["price"]: { priceTo: undefined, priceFrom: undefined },
        },
      });
    }
  },

  deleteAllFilters: () => {
    set({
      filterParams: {
        price: {
          priceFrom: undefined,
          priceTo: undefined,
        },
        sizes: [],
        ingredients: [],
        pizzaTypes: [],
      },
    });
  },
}));
