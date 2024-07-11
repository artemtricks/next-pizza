"use client";

import React from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";

type Props = {
  className?: string;
  title: string;
  items: any[];
  categoryId: number;
  listClassName?: string;
};

export const ProductCardList = (props: Props) => {
  const { className, title, items, categoryId, listClassName } = props;
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 0.4 });
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((item) => (
          <ProductCard
            id={item.id}
            name={item.name}
            key={item.id}
            imageUrl={item.imageUrl}
            price={550}
          />
        ))}
      </div>
    </div>
  );
};
