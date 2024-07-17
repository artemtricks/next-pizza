"use client";
import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui";
import { cn } from "@/lib/utils";
import { useClickAway } from "react-use";
import Link from "next/link";

type Props = {
  className?: string;
};

export const SearchInput = (props: Props) => {
  const { className } = props;
  const [focused, setFocused] = React.useState<boolean>(false);
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    setFocused(false);
  });
  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30" />
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <Input
          className="rounded-2xl w-full outline-none pl-11 bg-gray-100"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
        />
        <div
          className={cn(
            "absolute w-full rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30 bg-white",
            focused && "opacity-100 visible top-12"
          )}
        >
          <Link
            href="product/1"
            className="flex items-center gap-3 w-full py-2 px-3 cursor-pointer hover:bg-primary/10"
          >
            <img
              src="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              alt="pizza-1"
              className="h-8 w-8 rounded-sm"
            />

            <span className="">pizza 1</span>
          </Link>
        </div>
      </div>
    </>
  );
};
