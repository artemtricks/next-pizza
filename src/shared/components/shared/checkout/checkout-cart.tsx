import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { Ingredient } from "@prisma/client";
import { PizzaVariantType } from "../choose-pizza-form";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { getCartItemDetails } from "@/shared/lib";

type Props = {
  className?: string;
  items: CartStateItem[];
  loading: boolean;
  removeCartItem: (id: number) => Promise<void>;

  updateItemQuantity: (quantity: number, id: number) => Promise<void>;
};

export const CheckoutCart = (props: Props) => {
  const { className, items, loading, removeCartItem, updateItemQuantity } =
    props;

  const onClickCountButton = (
    type: "plus" | "minus",
    id: number,
    quantity: number
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(newQuantity, id);
  };
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      {loading
        ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
        : items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                {
                  size: item.pizzaSize,
                  type: item.pizzaType,
                } as PizzaVariantType,
                item.ingredients as Ingredient[]
              )}
              name={item.name}
              price={item.price}
              quantity={item.quantyty}
              disabled={item.disabled}
              onClickCountButton={(type) =>
                onClickCountButton(type, item.id, item.quantyty)
              }
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}
    </WhiteBlock>
  );
};
