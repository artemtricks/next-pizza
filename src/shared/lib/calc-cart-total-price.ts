import { CartItemDto } from "../services/dto/cart.dto";

export const calcCartTotalPrice = (items: CartItemDto): number => {
  const totalPriceIngredient = items.ingredients.reduce(
    (acc, curr) => acc + curr.price,
    0
  );

  const totalPrice =
    (totalPriceIngredient + items.productItem?.price) * items.quantyty;

  return totalPrice;
};
