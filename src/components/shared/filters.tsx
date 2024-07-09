import React from "react";

import { FilterCheckbox, Title } from "./index";

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
      </div>
    </div>
  );
};
