"use client";

import { type Review } from "@/api/types";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";

const createStore = (reviews: Review[]) =>
  create<{ reviews: Review[]; setReviews: (reviews: Review[]) => void }>(
    (set) => ({
      reviews,
      setReviews(reviews: Review[]) {
        set({ reviews });
      },
    })
  );

const ReviewsContext = createContext<ReturnType<typeof createStore> | null>(
  null
);

export const useReviews = () => {
  if (!ReviewsContext) {
    throw new Error("useCart must be used within a ReviewsProvider");
  }
  return useContext(ReviewsContext)!;
};

const ReviewsProvider = ({
  reviews,
  children,
}: {
  reviews: Review[];
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStore(reviews));
  return (
    <ReviewsContext.Provider value={store}>{children}</ReviewsContext.Provider>
  );
};

export default ReviewsProvider;
