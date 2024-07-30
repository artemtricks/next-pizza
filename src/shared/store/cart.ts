// TODO typing value

import { create } from "zustand";
import { CartStateItem, getCartDetails } from "../lib/get-cart-details";
import { Api } from "../services/api-client";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  //   updateItemQuantity: (quantity: number, id: number) => Promise<void>;
  //   addCartItem: (value: any) => Promise<void>;
  //   removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  //   updateItemQuantity: (quantity: number, id: number) => {},
  //   addCartItem: (value: any) => {},
  //   removeCartItem: (id: number) => {},
}));
