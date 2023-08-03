import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store'

type SortTypeState = {
  name: string; sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
}

interface FilterSliceState {
  categoryId: number;
  pageNumber: number;
  sortType: SortTypeState,
  searchValue: string;
}

const initialState = {
  categoryId: 0,
  pageNumber: 1,
  sortType: { name: 'популярности', sortProperty: 'rating' },
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setFillters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortTypeProp;
      state.pageNumber = Number(action.payload.pageNumber);
    },
  },
});

export const selectCategoryId = (state: RootState) => state.filter.categoryId;
export const selectSortType = (state: RootState) => state.filter.sortType;
export const selectFilter = (state: RootState) => state.filter;
export const selectSearchValue = (state: RootState) => state.filter.searchValue;
export const { setCategoryId, setSortType, setPageNumber, setFillters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
