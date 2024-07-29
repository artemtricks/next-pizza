import React from "react";
import { PizzaVariantType } from "../components/shared/choose-pizza-form";
import { Ingredient } from "@prisma/client";
import { mapPizzaType } from "../constants/pizzas";

export const getCartItemDetails = (
  pizzaVariant: PizzaVariantType,
  ingredients: Ingredient[]
) => {
  const details = [];

  if (pizzaVariant.size && pizzaVariant.type) {
    const typeName = mapPizzaType[pizzaVariant.type];
    details.push(`${typeName} ${pizzaVariant.size} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((item) => item.name));
  }

  return details.join(", ");
};
