import { type Cart, type Review } from "@/api/types";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export interface CartState {
  cart: Cart;
}

const initialState: CartState = {
  cart: {
    products: [],
  },
};

export interface ReviewState {
  reviews: Review[] | null;
}

const initialReviews: ReviewState = {
  reviews: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
  },
});

export const reviewSlice = createSlice({
  name: "reviews",
  initialState: initialReviews,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
  },
});

export const createStore = () =>
  configureStore({
    reducer: {
      cart: cartSlice.reducer,
      reviews: reviewSlice.reducer,
    },
  });

export const { setCart } = cartSlice.actions;
export const { setReviews } = reviewSlice.actions;

export type StoreType = ReturnType<typeof createStore>;
export type RootState = ReturnType<StoreType["getState"]>;
export type AppDispatch = StoreType["dispatch"];

export const useCart = () => useSelector((state: RootState) => state.cart.cart);
export const useReviews = () =>
  useSelector((state: RootState) => state.reviews.reviews);
