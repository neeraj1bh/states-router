"use client";

import { type Cart } from "@/api/types";
import { FC, useRef } from "react";
import { createStore } from "./store";
import { Provider } from "react-redux";

interface Props {
  cart: Cart;
  children: React.ReactNode;
}

const StoreProvider: FC<Props> = ({ cart, children }) => {
  const storeRef = useRef<ReturnType<typeof createStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
