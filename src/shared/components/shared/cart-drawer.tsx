"use client";

import React, { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import Link from "next/link";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store/cart";
import { PizzaVariantType } from "./choose-pizza-form";
import { Ingredient } from "@prisma/client";

type Props = {
  className?: string;
  children: ReactNode;
};

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = (
  props: Props
) => {
  const { children } = props;

  const {
    fetchCartItems,
    loading,
    items,
    updateItemQuantity,
    totalAmount,
    removeCartItem,
  } = useCartStore((state) => state);
  const total = items.find((item) => item)?.quantyty;

  const onClickCountButton = (
    type: "plus" | "minus",
    id: number,
    quantity: number
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    console.log({ newQuantity, id });
    updateItemQuantity(newQuantity, id);
  };

  const onClickRemove = (id: number) => {
    removeCartItem(id);
  };
  React.useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{total} товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
          {items.map((item) => (
            <div className="mb-2" key={item.id}>
              <CartDrawerItem
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
                onClickCountButton={(type) =>
                  onClickCountButton(type, item.id, item.quantyty)
                }
                onClickRemove={onClickRemove}
              />
            </div>
          ))}
        </div>
        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>

            <Link href="/checkout">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
