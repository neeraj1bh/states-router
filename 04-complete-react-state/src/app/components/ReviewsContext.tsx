"use client";

import React, { createContext, useContext, useState } from "react";
import { type Review } from "@/api/types";

const useReviewsState = (initialReviews: Review[]) =>
  useState<Review[]>(initialReviews);

export const ReviewsContext = createContext<ReturnType<
  typeof useReviewsState
> | null>(null);

export const useReviews = () => {
  const reviews = useContext(ReviewsContext);
  if (!reviews) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return reviews;
};

const ReviewsProvider = ({
  reviews: initialReviews,
  children,
}: {
  reviews: Review[];
  children: React.ReactNode;
}) => {
  const [reviews, setReviews] = useReviewsState(initialReviews);

  return (
    <ReviewsContext.Provider value={[reviews, setReviews]}>
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsProvider;
