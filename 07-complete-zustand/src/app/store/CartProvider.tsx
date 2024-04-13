"use client";

import { type Cart } from "@/api/types";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";

const createStore = (cart: Cart) =>
  create<{ cart: Cart; setCart: (cart: Cart) => void }>((set) => ({
    cart,
    setCart(cart: Cart) {
      set({ cart });
    },
  }));

const CartContext = createContext<ReturnType<typeof createStore> | null>(null);

export const useCart = () => {
  if (!CartContext) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return useContext(CartContext)!;
};

const CartProvider = ({
  cart,
  children,
}: {
  cart: Cart;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStore(cart));
  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
};

export default CartProvider;
