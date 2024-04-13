"use client";

import { Provider, createStore } from "jotai";
import { FC, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const StoreProvider: FC<Props> = ({ children }) => {
  const [store] = useState(() => createStore());

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
