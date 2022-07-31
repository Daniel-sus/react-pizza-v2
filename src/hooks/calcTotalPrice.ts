import { CartItemType } from "../redux-toolkit/reducers/cart/types";

export const calcTotalPrice = (cart: CartItemType[], name: string) => {
  const price = cart.reduce(
    (sum, item) => sum + item.price * item.quantityadded,
    0
  );
  const taxes = Math.floor((price / 100) * 5);
  const delivery = Math.floor((price / 100) * 10);
  if (name === "price") {
    return price;
  }
  if (name === "taxes") {
    return taxes;
  }
  if (name === "delivery") {
    return delivery;
  }
  if (name === "total") {
    return price + taxes + delivery;
  }
};
