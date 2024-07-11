import React from "react";

import { FilterCheckbox, Title } from "./index";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filter-group";

type Props = {
  className?: string;
};

export const Filters = (props: Props) => {
  const { className } = props;
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
              defaultValue={0}
            />
            <Input type="number" placeholder="1000" min={100} max={1000} />
          </div>
          <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
        </div>
        <CheckboxFiltersGroup
          title="Ингредиенты"
          name="ingredients"
          className="mt-5"
          limit={6}
          defaultItems={[
            { text: "Сырный соус", value: "1" },
            { text: "Моцарелла", value: "2" },
            { text: "Чеснок", value: "3" },
            { text: "Соленые огурчики", value: "4" },
            { text: "Томаты", value: "5" },
          ]}
          items={[
            { text: "Сырный соус", value: "1" },
            { text: "Моцарелла", value: "2" },
            { text: "Чеснок", value: "3" },
            { text: "Соленые огурчики", value: "4" },
            { text: "Томаты", value: "5" },
            { text: "Моцарелла", value: "6" },
            { text: "Чеснок", value: "7" },
            { text: "Соленые огурчики", value: "8" },
            { text: "Томаты", value: "9" },
          ]}

          // onClickCheckbox={filters.setSelectedIngredients}
          // selected={filters.selectedIngredients}
        />
      </div>
    </div>
  );
};
