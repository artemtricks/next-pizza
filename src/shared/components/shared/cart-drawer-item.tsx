import { cn } from "@/shared/lib/utils";
import React from "react";
import { CartItemProps } from "./cart-item-detail/cart-item-details.types";
import * as CartItem from "./cart-item-detail";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";

type Props = {
  className?: string;
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove: (id: number) => void;
} & CartItemProps;

export const CartDrawerItem = (props: Props) => {
  const {
    className,
    id,
    imageUrl,
    name,
    price,
    quantity,
    details,
    onClickCountButton,
    onClickRemove,
    disabled,
  } = props;

  return (
    <div
      className={cn(
        "flex, bg-white p-5 gap-6",
        { "opacity-50 pointer-events-none": disabled },
        className
      )}
    >
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info details={details} name={name} />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton value={quantity} onClick={onClickCountButton} />
          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600 "
              size={16}
              onClick={() => onClickRemove(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
