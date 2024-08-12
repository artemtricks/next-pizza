import React from "react";
import { Container } from "./container";
import { Catigories } from "./catigories";
import { SortPopup } from "./sort-popup";
import { cn } from "@/shared/lib/utils";
import { Category } from "@prisma/client";
import { FilterToolbar } from "./filter-toolbar";

type Props = {
  className?: string;
  categories: Category[];
};

export const TopBar = (props: Props) => {
  const { className, categories } = props;

  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between mb-3">
        <Catigories items={categories} />
        <SortPopup />
      </Container>
      <FilterToolbar />
    </div>
  );
};
