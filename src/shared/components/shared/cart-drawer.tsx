"use client";

import React, { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui";
import Link from "next/link";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store/cart";
import { PizzaVariantType } from "./choose-pizza-form";
import { Ingredient } from "@prisma/client";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { useCart } from "@/shared/hooks/useCart";

type Props = {
  className?: string;
  children: ReactNode;
};

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = (
  props: Props
) => {
  const { children } = props;
  const { updateItemQuantity, items, removeCartItem, totalAmount } = useCart();
  const total = items.find((item) => item)?.quantyty;

  const onClickCountButton = (
    type: "plus" | "minus",
    id: number,
    quantity: number
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(newQuantity, id);
  };

  const onClickRemove = (id: number) => {
    removeCartItem(id);
  };

  const [redirecting, setRedirecting] = React.useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <div
          className={cn(
            "flex flex-col h-full",
            !totalAmount && "justify-center"
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине <span className="font-bold">{total} товара</span>
              </SheetTitle>
            </SheetHeader>
          )}
          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Корзина пустая"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>

              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}
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
                  disabled={item.disabled}
                />
              </div>
            ))}
          </div>

          {totalAmount > 0 && (
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
                  <Button
                    loading={redirecting}
                    type="submit"
                    className="w-full h-12 text-base"
                    onClick={() => setRedirecting(true)}
                  >
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
