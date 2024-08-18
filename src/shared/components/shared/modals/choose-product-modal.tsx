"use client";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";

import { ProductWithRelation } from "@/@types/prisma";

import { ProductForm } from "../product-form";

type Props = {
  className?: string;
  product: ProductWithRelation;
};

export const ChooseProductModal = (props: Props) => {
  const { className, product } = props;
  const router = useRouter();
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <ProductForm product={product} onRouterBack={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
