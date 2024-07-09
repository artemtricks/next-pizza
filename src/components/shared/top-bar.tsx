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
        "sticky bg-white py-5 shadow-lg z-10 shadow-black/5",
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
