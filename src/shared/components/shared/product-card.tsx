import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
  className?: string;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export const ProductCard = (props: Props) => {
  const { className, id, price, imageUrl, name } = props;
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center bg-secondary p-6 rounded-lg h-[260px] ">
          <img src={imageUrl} alt={name} className="w-[215px] h-[215px]" />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">
          Цыпленок моцарелла вкусная пицца и прочие радости
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} р</b>
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
