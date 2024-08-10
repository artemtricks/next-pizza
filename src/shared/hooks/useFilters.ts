import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { PriceProps, QueryFilters } from "../components/shared/filters";
import React from "react";

export const useFilters = () => {
  const searchParam = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;
  const [sizes, { toggle: toggleSize }] = useSet(
    new Set<string>(
      searchParam.has("sizes") ? searchParam.get("sizes")?.split(",") : []
    )
  );

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParam.has("pizzaTypes")
        ? searchParam.get("pizzaTypes")?.split(",")
        : []
    )
  );

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(
      new Set<string>(
        searchParam.has("ingredients") ? searchParam.get("ingredients") : []
      )
    )
  );

  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParam.get("priceFrom")) || undefined,
    priceTo: Number(searchParam.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  return {
    price,
    setPrice,
    updatePrice,
    selectedIngredients,
    toggleIngredients,
    pizzaTypes,
    togglePizzaTypes,
    sizes,
    toggleSize,
  };
};
