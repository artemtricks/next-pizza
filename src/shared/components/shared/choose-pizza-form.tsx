import { cn } from "@/shared/lib/utils";
import React from "react";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";

type Props = {
  name: string;
  imageUrl: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
};

export const ChoosePizzaForm = (props: Props) => {
  const { name, imageUrl, ingredients, items, onClickAdd, className } = props;
  const detailText = "30sm traditionaly testo 30";
  const totalPrice = 350;
  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={30} />
      <div className="w-[490px] p-7 bg-[#f7f6f5]">
        <Title size="md" text={name} className="font-extralight mb-1" />
        <p className="text-gray-400">{detailText}</p>
        <Button className="h-[55px] w-full px-10 rounded-[18px] text-base mt-10">
          Add to cart for {totalPrice} p
        </Button>
      </div>
    </div>
  );
};
