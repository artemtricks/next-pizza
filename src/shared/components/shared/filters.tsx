"use client";
import React from "react";
import { Title } from "./index";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filter-group";
import { useQueryFilter, useIngredients } from "@/shared/hooks";
import { useFilterStore } from "@/shared/store/filters";

type Props = {
  className?: string;
};

export type PriceProps = {
  priceFrom?: number;
  priceTo?: number;
};

export type QueryFilters = {
  pizzaTypes: string;
  ingredients: string;
  sizes: string;
} & PriceProps;

export const Filters = (props: Props) => {
  const { className } = props;
  const { ingredients, loading } = useIngredients();

  const { updatePrice, filterParams, setFiltersParams } = useFilterStore(
    (state) => state
  );

  useQueryFilter(filterParams);

  const ingredientsAll = ingredients.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  return (
    <div>
      <div className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
        <CheckboxFiltersGroup
          title="Тип теста"
          name="pizzaTypes"
          className="mb-5"
          onClickCheckbox={(value) => {
            setFiltersParams(value, "pizzaTypes");
          }}
          selected={filterParams.pizzaTypes}
          items={[
            { text: "Тонкое", value: "1" },
            { text: "Традиционное", value: "2" },
          ]}
        />

        <CheckboxFiltersGroup
          title="Размеры"
          name="sizes"
          className="mb-5"
          onClickCheckbox={(value) => setFiltersParams(value, "sizes")}
          selected={filterParams.sizes}
          items={[
            { text: "20 см", value: "20" },
            { text: "30 см", value: "30" },
            { text: "40 см", value: "40" },
          ]}
        />

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mp-3">Цена от и до:</p>
          <div className="flex gap-3 mb-5">
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={1000}
              value={String(filterParams.price.priceFrom)}
              onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="1000"
              min={100}
              max={1000}
              value={String(filterParams.price.priceTo)}
              onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
            />
          </div>
          <RangeSlider
            min={0}
            max={1000}
            step={10}
            value={[
              filterParams.price.priceFrom || 0,
              filterParams.price.priceTo || 1000,
            ]}
            onValueChange={([priceFrom, priceTo]) =>
              setFiltersParams(
                { priceFrom: priceFrom, priceTo: priceTo },
                "price"
              )
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
          onClickCheckbox={(value) => setFiltersParams(value, "ingredients")}
          selected={filterParams.ingredients}
        />
      </div>
    </div>
  );
};
