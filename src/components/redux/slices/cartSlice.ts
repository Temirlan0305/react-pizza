import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store'

type ItemsState = {
  id: string; imageUrl: string; title: string; sizes: string[]; count: number; price: number; types: string[];
}

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: ItemsState[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addCartItem: (state, action) => {
      const filterItems = state.items.find((obj) => obj.id === action.payload.id);
      if (filterItems) {
        filterItems.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalCount = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter((obj) => action.payload !== obj.id);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalCount = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    minusCartItem: (state, action) => {
      const filterItems = state.items.find((obj) => obj.id === action.payload.id);
      if (filterItems) {
        if (filterItems.count > 1) {
          filterItems.count -= 1;
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
        state.totalCount = state.items.reduce((sum, obj) => {
          return obj.count + sum;
        }, 0);
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartId = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)
export const { addCartItem, removeCartItem, clearItems, minusCartItem } = cartSlice.actions;
export default cartSlice.reducer;
