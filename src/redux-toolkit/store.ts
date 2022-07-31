import { configureStore } from "@reduxjs/toolkit";
import items from "./reducers/items/slices";
import filter from "./reducers/filter/slices";
import cart from "./reducers/cart/slices";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    items,
    filter,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
