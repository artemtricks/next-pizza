// TODO typing value

import { create } from "zustand";
import { CartStateItem, getCartDetails } from "../lib/get-cart-details";
import { Api } from "../services/api-client";
import { CrateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (quantity: number, id: number) => Promise<void>;
  addCartItem: (value: CrateCartItemValues) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
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

  updateItemQuantity: async (quantity: number, id: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updataItemQuantity(id, quantity);

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.removeCartItem(id);

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (value: CrateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(value);

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
