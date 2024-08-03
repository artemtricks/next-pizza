import React from "react";
import { PizzaVariantType } from "../components/shared/choose-pizza-form";
import { PizzaSize } from "../constants/pizzas";
import { Variant } from "../components/shared/group-variants";
import { getAvailablePizzaSize } from "../lib";
import { ProductWithRelation } from "@/@types/prisma";
import { useSet } from "react-use";

type ReturnProps = {
  pizzaVariant: PizzaVariantType;
  setPizzaVariant: React.Dispatch<React.SetStateAction<PizzaVariantType>>;
  avilablePizzaSizes: Variant[];
  addIngredient: (key: number) => void;
  selectedIngredients: Set<number>;
  currentItemId: number | undefined;
};

export const usePizzaOptions = (
  items: ProductWithRelation["items"]
): ReturnProps => {
  const [pizzaVariant, setPizzaVariant] = React.useState<PizzaVariantType>({
    size: 20,
    type: 1,
  });

  const { avilablePizzaSizes } = getAvailablePizzaSize(items, pizzaVariant);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const currentItemId = items.find(
    (item) =>
      item.pizzaType === pizzaVariant.type && item.size === pizzaVariant.size
  )?.id;

  React.useEffect(() => {
    const isAvailabelSize = avilablePizzaSizes.find(
      (item) =>
        Number(item.value) === Number(pizzaVariant.size) && !item.disabled
    );
    const availableSize = avilablePizzaSizes?.find(
      (item) => !item.disabled
    )?.value;

    if (availableSize && !isAvailabelSize) {
      setPizzaVariant((prev) => ({
        ...prev,
        size: Number(availableSize) as PizzaSize,
      }));
    }
  }, [pizzaVariant.type]);
  return {
    pizzaVariant,
    setPizzaVariant,
    avilablePizzaSizes,
    selectedIngredients,
    addIngredient,
    currentItemId,
  };
};
