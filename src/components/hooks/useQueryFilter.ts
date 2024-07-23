import React from "react";
import { PriceProps } from "../shared/filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  price: PriceProps;
}

export const useQueryFilter = (props: Filters) => {
  const { price, pizzaTypes, selectedIngredients, sizes } = props;

  const router = useRouter();

  React.useEffect(() => {
    const filters = {
      ...price,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    };

    const query = qs.stringify(filters, { arrayFormat: "comma" });

    router.push(`?${query}`, { scroll: false });
  }, [price, pizzaTypes, sizes, selectedIngredients]);
};
