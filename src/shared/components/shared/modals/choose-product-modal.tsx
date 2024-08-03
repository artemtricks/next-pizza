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

type Props = {
  className?: string;
  product: ProductWithRelation;
};

export const ChooseProductModal = (props: Props) => {
  const { className, product } = props;
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const { addCartItem } = useCartStore((state) => state);

  const handleAddProduct = () => {
    addCartItem({ productItemId: firstItem.id });
  };

  const handleAddPizza = (itemId: number, ingredients: number[]) => {
    addCartItem({ productItemId: itemId, ingredients });
  };

  console.log(product, "product");
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
            onSubmit={handleAddPizza}
          />
        ) : (
          <ChooseProductForm
            name={product.name}
            imageUrl={product.imageUrl}
            onSubmit={handleAddProduct}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
