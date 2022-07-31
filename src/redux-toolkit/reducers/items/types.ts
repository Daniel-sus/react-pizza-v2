export type SearchPizzaParams = {
  pageNumber: number;
  searchBy: string;
  filterBy: number;
  sortBy: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
}

export type ItemsState = {
  pizzas: ItemType[];
  status: Status;
};

export type ItemType = {
  id: number;
  title: string;
  imageUrl: string;
  iconUrl?: string;
  text: string;
  price: number;
  quantityadded: number;
  types: number[];
  sizes: number[];
  rating: number;
  category: number;
};

export type ModalDataType = {
  id: number;
  imageUrl: string;
  title: string;
  text: string;
  price: number;
  quantityadded: number;
  types: string;
  sizes: number;
  toppings: string[];
};
