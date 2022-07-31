import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../../hooks/getCartFromLS";
import {
  CartItemType,
  CartState,
  ModalData,
  OrderConfirmedType,
  OrderType,
} from "./types";

const initialState: CartState = {
  items: getCartFromLS(),
  modalData: {
    id: 0,
    imageUrl: "",
    title: "",
    text: "",
    price: 0,
    quantityadded: 0,
    types: "",
    sizes: 0,
    toppings: [],
  },
  timerId: 0,
  orders: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemAdd(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (item) =>
          Number(item.id) === Number(action.payload.id) &&
          Number(item.sizes) === Number(action.payload.sizes) &&
          item.types === action.payload.types &&
          JSON.stringify(item.toppings) ===
            JSON.stringify(action.payload.toppings)
      );
      if (findItem) {
        findItem.quantityadded++;
      } else {
        state.items.push({ ...action.payload, quantityadded: 1 });
      }
    },
    itemDelete(state, action: PayloadAction<any>) {
      if (action.payload.isItemInCart) {
        const findItem: any = state.items.find(
          (cartItem) =>
            Number(cartItem.id) === Number(action.payload.id) &&
            Number(cartItem.sizes) === Number(action.payload.sizes) &&
            cartItem.types === action.payload.types &&
            JSON.stringify(cartItem.toppings) ===
              JSON.stringify(action.payload.toppings)
        );
        if (findItem.quantityadded > 1) {
          findItem.quantityadded--;
        } else {
          state.items = state.items.filter((item) => item !== findItem);
        }
      } else {
        const reversedCartArray = [...state.items];
        const findLastItem: any = reversedCartArray
          .reverse()
          .find((item) => Number(item.id) === Number(action.payload.id));
        const itemIndex = state.items.indexOf(findLastItem);
        if (findLastItem.quantityadded > 1) {
          findLastItem.quantityadded--;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    removeItem(state, action: PayloadAction<CartItemType>) {
      state.items = state.items.filter(
        (cartItem) =>
          Number(cartItem.id) !== Number(action.payload.id) ||
          Number(cartItem.sizes) !== Number(action.payload.sizes) ||
          cartItem.types !== action.payload.types ||
          JSON.stringify(cartItem.toppings) !==
            JSON.stringify(action.payload.toppings)
      );
    },
    deleteAllItems(state) {
      state.items = [];
    },
    transferDataToModal(state, action: PayloadAction<ModalData>) {
      state.modalData = action.payload;
    },
    setTimerId(state, action: PayloadAction<number>) {
      state.timerId = action.payload;
    },
    setNewOrders(state, action: PayloadAction<OrderType[]>) {
      state.orders = action.payload;
    },
    setCartItemsLS(state, action: PayloadAction<CartItemType[]>) {
      state.items = action.payload;
    },
    transferDataToOrderConfirmed(
      state,
      action: PayloadAction<OrderConfirmedType>
    ) {
      state.currentOrder = action.payload;
    },
  },
});

export const {
  itemAdd,
  itemDelete,
  deleteAllItems,
  transferDataToModal,
  setTimerId,
  setNewOrders,
  setCartItemsLS,
  removeItem,
  transferDataToOrderConfirmed,
} = cartSlice.actions;

export default cartSlice.reducer;
