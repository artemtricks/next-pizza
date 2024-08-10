import { cn } from "@/shared/lib/utils";
import React from "react";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";

type Props = {
  name: string;
  imageUrl: string;
  onSubmit: () => void;
  className?: string;
  price: number;
  loading?: boolean;
};

export const ChooseProductForm = (props: Props) => {
  const { name, imageUrl, onSubmit, className, price, loading } = props;

  return (
    <div className={cn("flex flex-1", className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
      <div className="w-[490px] p-7 bg-[#f7f6f5]">
        <Title size="md" text={name} className="font-extralight mb-1" />

        <Button
          loading={loading}
          onClick={onSubmit}
          className="h-[55px] w-full px-10 rounded-[18px] text-base mt-10"
        >
          Add to cart for {price} p
        </Button>
      </div>
    </div>
  );
};
