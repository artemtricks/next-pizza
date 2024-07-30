import { CartDTO } from "../services/dto/cart.dto";
import { calcCartTotalPrice } from "./calc-cart-total-price";

export type CartStateItem = {
  id: number;
  name: string;
  quantyty: number;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  totalAmount: number;
  items: CartStateItem[];
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    name: item.productItem.product.name,
    quantyty: item.quantyty,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartTotalPrice(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingred) => ({
      name: ingred.name,
      price: ingred.price,
    })),
  }));
  return { totalAmount: data.totalAmount, items };
};
