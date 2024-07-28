import { ProductWithRelation } from "@/@types/prisma";
import { PizzaVariantType } from "../components/shared/choose-pizza-form";
import { pizzaSizes } from "../constants/pizzas";

export const getAvailablePizzaSize = (
  items: ProductWithRelation["items"],
  pizzaVariant: PizzaVariantType
) => {
  const avilablePizza = items.filter(
    (item) => item.pizzaType === pizzaVariant.type
  );

  const avilablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !avilablePizza.some(
      (itemDis) => Number(itemDis.size) === Number(item.value)
    ),
  }));

  return { avilablePizzaSizes };
};
