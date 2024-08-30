import React from "react";
import { useCartStore } from "../store/cart";

export const useCart = () => {
  const cartStore = useCartStore((state) => state);

  React.useEffect(() => {
    cartStore.fetchCartItems();
  }, []);

  return cartStore;
};
