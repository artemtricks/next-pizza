import React from "react";
import { QueryFilters } from "@/shared/store/filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilter = (props: QueryFilters) => {
  const { price, ingredients, pizzaTypes, sizes } = props;

  const router = useRouter();

  React.useEffect(() => {
    const filters = {
      ...price,
      pizzaTypes,
      sizes,
      ingredients,
    };

    const query = qs.stringify(filters, { arrayFormat: "comma" });

    router.push(`?${query}`, { scroll: false });
  }, [price, pizzaTypes, sizes, ingredients]);
};
