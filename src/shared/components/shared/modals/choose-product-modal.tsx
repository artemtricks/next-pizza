"use client";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { Product } from "@prisma/client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelation } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store/cart";
import { CrateCartItemValues } from "@/shared/services/dto/cart.dto";
import toast from "react-hot-toast";

type Props = {
  className?: string;
  product: ProductWithRelation;
};

export const ChooseProductModal = (props: Props) => {
  const { className, product } = props;
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const { addCartItem, loading } = useCartStore((state) => state);

  const onSubmit = async (itemId?: number, ingredients?: number[]) => {
    try {
      isPizzaForm
        ? await addCartItem({ productItemId: itemId!, ingredients })
        : await addCartItem({ productItemId: firstItem.id });

      toast.success(
        `${isPizzaForm ? "Пицца добавлена" : "Продукт добавлен"} в корзину!`
      );
      router.back();
    } catch (err) {
      console.error(err);
      toast.error(`Не удалось добавить в корзину`);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            name={product.name}
            imageUrl={product.imageUrl}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            name={product.name}
            imageUrl={product.imageUrl}
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
