import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PRODUCT} from '../../services/modules/listing/listing';

type CartItem = PRODUCT & {
  quantity?: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({...newItem, quantity: 1});
      }
      state.total += newItem.price;
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const itemId = action.payload.id;
      const existingItem = state.items.find(item => item.id === itemId);
      if (existingItem?.quantity === 1) {
        state.items = state.items.filter(item => item.id !== itemId);
      } else {
        existingItem.quantity--;
      }

      const itemPrice = existingItem?.price || 0;
      state.total -= itemPrice;
    },
    clearCart: state => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {addItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
