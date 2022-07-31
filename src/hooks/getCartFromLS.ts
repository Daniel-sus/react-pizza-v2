import { CartItemType } from "../redux-toolkit/reducers/cart/types";

export const getCartFromLS = (): CartItemType[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};
