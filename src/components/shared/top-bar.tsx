import React from "react";
import { Container } from "./container";
import { Catigories } from "./catigories";
import { SortPopup } from "./sort-popup";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const TopBar = (props: Props) => {
  const { className } = props;
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Catigories />
        <SortPopup />
      </Container>
    </div>
  );
};
