import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sortByArray } from "../../../components/sortby/SortBy";
import { ItemType, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<ItemType[], SearchPizzaParams>(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { pageNumber, searchBy, filterBy, sortBy } = params;
    const { data } = await axios.get<ItemType[]>(
      `https:61e6a5ccce3a2d0017359303.mockapi.io/pizzas?page=${pageNumber}&limit=8&search=${searchBy}${
        filterBy === 0 ? "" : `&category=${filterBy}`
      }&sortBy=${sortByArray[sortBy].type}&order=${sortByArray[sortBy].order}`
    );
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return data;
  }
);
