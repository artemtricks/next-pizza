"use client";
import React from "react";
import { Container } from "./container";
import { QueryFilters, useFilterStore } from "@/shared/store/filters";
import { X } from "lucide-react";

type FilterType = {
  id: number;
  name: keyof QueryFilters;
};

export const FilterToolbar = () => {
  const { filterParams, deleteActiveFilter, deleteAllFilters } = useFilterStore(
    (state) => state
  );
  const filterCategoryNames = {
    pizzaTypes: "тип теста",
    ingredients: "ингредиенты",
    sizes: "размер",
    price: "цена",
  };

  const filters = Object.values(filterParams).reduce(
    (acc: FilterType[], curr, index) => {
      const filterKeys = Object.keys(filterParams);

      const currArray = Array.isArray(curr) ? curr : Object.values(curr);
      const somePrice = currArray.some((value) => value === undefined);

      if (currArray && currArray.length > 0 && !somePrice) {
        acc.push({
          name: filterKeys[index] as FilterType["name"],
          id: index + 1,
        });
      }
      return acc;
    },
    []
  );
  return (
    <Container className="flex items-center justify-center">
      {Boolean(filters) &&
        filters.length > 0 &&
        filters.map((item) => (
          <div
            key={item.id}
            className="flex  h-10 bg-black rounded-3xl mr-3 justify-between items-center font-bold pr-2 pl-3 "
          >
            <div className="text-slate-50 mr-3">
              {filterCategoryNames[item.name]}
            </div>
            <div
              className="cursor-pointer text-white"
              onClick={() =>
                deleteActiveFilter(item.name as keyof QueryFilters)
              }
            >
              <X className="h-5 w-5" />
            </div>
          </div>
        ))}
      {Boolean(filters) && filters.length > 1 && (
        <b
          className="text-primary ml-5 cursor-pointer"
          onClick={() => deleteAllFilters()}
        >
          Очистить все фильтры
        </b>
      )}
    </Container>
  );
};
