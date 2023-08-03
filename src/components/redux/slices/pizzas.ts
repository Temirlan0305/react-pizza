import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type fetchPizzasStatic = {
  sortOrder: string,
  sortBy: string,
  categoryBy: string,
  search: string,
  pageNumber: number,
}

type PizzasType = {
  id: string;
  imageUrl: string;
  title: string;
  category: number;
  rating: number;
  sizes: number[];
  price: number; 
  types: number[];
}

enum Status {
  LOADING = 'loading',
  FULFILLED = 'success',
  REJECTED = 'error',
}

interface PizzasState {
  items: PizzasType[],
  status: Status.FULFILLED | Status.LOADING | Status.REJECTED
}

export const fetchPizzas = createAsyncThunk<PizzasType[], fetchPizzasStatic>('pizzas/fetchPizzas', async (params) => {
  const { sortOrder, sortBy, categoryBy, search, pageNumber } = params;
  const { data } = await axios.get<PizzasType[]>(
    `https://63e07e1d8b24964ae0feef3e.mockapi.io/items?page=${pageNumber}&limit=4${categoryBy}&sortBy=${sortBy}&order=${sortOrder}${search}`,
  );
  return data;
});

const initialState: PizzasState = {
  items: [],
  status: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: 'pizzas', 
  initialState: initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzasType[]>) => {
      state.status = Status.FULFILLED;
      state.items = action.payload;
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.REJECTED;
      state.items = [];
    })
  // {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.status = 'success';
  //     state.items = action.payload;
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  },
});

export const selectPizzasData = (state: RootState) => state.pizzas;
export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
