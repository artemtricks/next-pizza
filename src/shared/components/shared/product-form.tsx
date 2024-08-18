"use client";
import React from "react";
import { useCartStore } from "../../store/cart";
import { ProductWithRelation } from "@/@types/prisma";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

type Props = {
  product: ProductWithRelation;
  onRouterBack?: VoidFunction;
};

export const ProductForm = ({ product, onRouterBack }: Props) => {
  const { addCartItem, loading } = useCartStore((state) => state);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (itemId?: number, ingredients?: number[]) => {
    try {
      isPizzaForm
        ? await addCartItem({ productItemId: itemId!, ingredients })
        : await addCartItem({ productItemId: firstItem.id });

      toast.success(
        `${isPizzaForm ? "Пицца добавлена" : "Продукт добавлен"} в корзину!`
      );
      onRouterBack?.();
    } catch (err) {
      console.error(err);
      toast.error(`Не удалось добавить в корзину`);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        name={product.name}
        imageUrl={product.imageUrl}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      name={product.name}
      imageUrl={product.imageUrl}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
