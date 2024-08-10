"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import {
  mapPizzaType,
  PizzaSize,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizzas";
import { IngredientItem } from "./ingredient-item";
import { Ingredient } from "@prisma/client";
import { useSet } from "react-use";
import { ProductWithRelation } from "@/@types/prisma";
import { getAvailablePizzaSize, calcTotalPrice } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks/usePizzaOptions";

type Props = {
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  items: ProductWithRelation["items"];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
  loading?: boolean;
};

export type PizzaVariantType = {
  size: PizzaSize;
  type: PizzaType;
};

export const ChoosePizzaForm = (props: Props) => {
  const { name, imageUrl, ingredients, items, onSubmit, className, loading } =
    props;

  const {
    pizzaVariant,
    setPizzaVariant,
    avilablePizzaSizes,
    selectedIngredients,
    addIngredient,
    currentItemId,
  } = usePizzaOptions(items);

  const { totalPrice } = calcTotalPrice(
    items,
    pizzaVariant,
    ingredients,
    selectedIngredients
  );

  const detailText = `${pizzaVariant.size} см, ${
    mapPizzaType[pizzaVariant.type]
  } тесто`;

  const handlePizzaCart = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={pizzaVariant.size as PizzaSize} />
      <div className="w-[490px] p-7 bg-[#f7f6f5]">
        <Title size="md" text={name} className="font-extralight mb-1" />
        <p className="text-gray-400">{detailText}</p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={avilablePizzaSizes}
            value={String(pizzaVariant.size)}
            onClick={(value) =>
              setPizzaVariant((prev) => ({
                ...prev,
                size: Number(value) as PizzaSize,
              }))
            }
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(pizzaVariant.type)}
            onClick={(value) =>
              setPizzaVariant((prev) => ({
                ...prev,
                type: Number(value) as PizzaType,
              }))
            }
          />
        </div>
        <div className="bg-gray-50 p-5 rounded-md  overflow-auto scrollbar mt-5 h-[420px]">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((item) => (
              <IngredientItem
                key={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onClick={() => addIngredient(item.id)}
                active={selectedIngredients.has(item.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handlePizzaCart}
          className="h-[55px] w-full px-10 rounded-[18px] text-base mt-10"
        >
          Add to cart for {totalPrice} p
        </Button>
      </div>
    </div>
  );
};
