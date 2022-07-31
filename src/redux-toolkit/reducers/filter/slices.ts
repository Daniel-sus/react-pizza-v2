import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "./types";

const initialState: FilterState = {
  filterBy: 0,
  sortBy: 0,
  searchBy: "",
  pageNumber: 1,
};

const filterSlice = createSlice({
  name: "filterReducer",
  initialState,
  reducers: {
    changeFilterBy(state, action: PayloadAction<number>) {
      state.filterBy = action.payload;
    },
    changeSortBy(state, action: PayloadAction<number>) {
      state.sortBy = action.payload;
    },
    changeSearchBy(state, action: PayloadAction<string>) {
      state.searchBy = action.payload;
    },
    changePageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
  },
});

export const {
  changeFilterBy,
  changeSortBy,
  changePageNumber,
  changeSearchBy,
} = filterSlice.actions;

export default filterSlice.reducer;
