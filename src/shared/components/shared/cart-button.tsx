import React from "react";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { CartDrawer } from "./cart-drawer";

type Props = {
  className?: string;
};

export const CartButton = (props: Props) => {
  const { className } = props;
  return (
    <CartDrawer>
      <Button className={cn("group relative", className)}>
        <b>520 р.</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0 ">
          <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
          <b>3</b>
        </div>
        <ArrowRight className="w-5 absolute right-5 duration-300 transition -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 " />
      </Button>
    </CartDrawer>
  );
};
