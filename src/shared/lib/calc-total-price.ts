import { ProductWithRelation } from "@/@types/prisma";
import { PizzaSize, PizzaType } from "../constants/pizzas";
import { Ingredient } from "@prisma/client";
import { PizzaVariantType } from "../components/shared/choose-pizza-form";

/**
 * Функция для посчета стоимости выбранной пиццы
 * 
 * @param нужно передать различные параметры и все заработает
 
 */

export const calcTotalPrice = (
  items: ProductWithRelation["items"],
  pizzaVariant: PizzaVariantType,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find(
      (item) =>
        item.size === pizzaVariant.size && item.pizzaType === pizzaVariant.type
    )?.price || 0;

  const totalingredientsPrice = ingredients
    .filter((item) => selectedIngredients.has(item.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice + totalingredientsPrice;

  return { totalPrice };
};
