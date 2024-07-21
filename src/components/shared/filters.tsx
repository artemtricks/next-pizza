"use client";

import React from "react";
import { FilterCheckbox, Title } from "./index";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filter-group";
import { useFilterIngredients } from "../hooks/useFilterIngredients";
import { Ingredient } from "@prisma/client";

type Props = {
  className?: string;
};

type PriceProps = {
  priceFrom: number;
  priceTo: number;
};

export const Filters = (props: Props) => {
  const { className } = props;
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();
  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1000,
  });

  const ingredientsAll = ingredients.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({ ...price, [name]: value });
  };

  return (
    <div>
      <div className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
        <div className="flex flex-col gap-4">
          <FilterCheckbox text="Можно Собирать" value="1" />
          <FilterCheckbox text="Новинки" value="2" />
        </div>

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mp-3">Цена от и до:</p>
          <div className="flex gap-3 mb-5">
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={1000}
              value={String(price.priceFrom)}
              onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="1000"
              min={100}
              max={1000}
              value={String(price.priceTo)}
              onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
            />
          </div>
          <RangeSlider
            min={0}
            max={1000}
            step={10}
            value={[price.priceFrom, price.priceTo]}
            onValueChange={([priceFrom, priceTo]) =>
              setPrice({ priceFrom, priceTo })
            }
          />
        </div>
        <CheckboxFiltersGroup
          title="Ингредиенты"
          name="ingredients"
          className="mt-5"
          limit={6}
          defaultItems={ingredientsAll.slice(0, 6)}
          items={ingredientsAll}
          loading={loading}
          onClickCheckbox={onAddId}
          selected={selectedIds}
        />
      </div>
    </div>
  );
};
