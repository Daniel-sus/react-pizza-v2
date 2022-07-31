export type toppingType = {
  title: string;
  imgUrl: string;
};

export type CartItemType = {
  id: number;
  imageUrl: string;
  iconUrl?: string;
  title: string;
  text: string;
  price: number;
  quantityadded: number;
  types: string;
  sizes: number;
  toppings: toppingType[];
  isItemInCart?: boolean;
};

export type ModalData = {
  id: number;
  imageUrl: string;
  iconUrl?: string;
  title: string;
  text: string;
  price: number;
  quantityadded: number;
  types: string;
  sizes: number;
  toppings?: string[];
};

export type CartState = {
  items: CartItemType[];
  modalData: ModalData;
  timerId: number;
  orders: OrderType[];
  currentOrder?: OrderConfirmedType;
};

export type OrderConfirmedType = {
  personalData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  purchaseData: {
    date: Date;
    status: string;
  };
  order: CartItemType[];
};

export interface OrderType extends OrderConfirmedType {
  id: number;
}
