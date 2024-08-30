"use client";

import {
  CheckoutItemSkeleton,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { CheckoutItem } from "@/shared/components/shared/checkout-item";
import { CheckoutSidebar } from "@/shared/components/shared/checkout-sidebar";
import { PizzaVariantType } from "@/shared/components/shared/choose-pizza-form";
import { Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizzas";
import { useCart } from "@/shared/hooks/useCart";
import { getCartItemDetails } from "@/shared/lib";
import { Ingredient } from "@prisma/client";
import React from "react";

export default function CheckoutPage() {
  const {
    totalAmount,
    items,
    loading,
    removeCartItem,
    addCartItem,
    updateItemQuantity,
  } = useCart();

  const onClickCountButton = (
    type: "plus" | "minus",
    id: number,
    quantity: number
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(newQuantity, id);
  };
  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <div className="flex gap-10">
        <div className="flex flex-col flex-1 mb-20 gap-10">
          <WhiteBlock title="1. Корзина">
            {loading
              ? [...Array(4)].map((_, index) => (
                  <CheckoutItemSkeleton key={index} />
                ))
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
          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" placeholder="Имя" className="text-base" />
              <Input
                name="lastName"
                placeholder="Фамилия"
                className="text-base"
              />
              <Input name="email" placeholder="Емаил" className="text-base" />
              <Input name="phone" placeholder="Телефон" className="text-base" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input
                name="address"
                placeholder="Введите адресс..."
                className="text-base"
              />
              <Textarea
                className="text-base"
                placeholder="Комментарий к заказу"
                rows={5}
              />
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
        </div>
      </div>
    </Container>
  );
}
