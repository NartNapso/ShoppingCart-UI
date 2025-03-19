import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, addToCart, removeFromCart } from "../../services/cartService";
import { CartItem } from "./cartTypes";

interface CartState {
  categories: { [key: string]: CartItem[] };
}

const initialState: CartState = {
  categories: {},
};

const groupByCategory = (items: CartItem[]): { [key: string]: CartItem[] } => {
  const grouped: { [key: string]: CartItem[] } = {};
  items.forEach((item) => {
    if (!item.category) return;
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });
  return grouped;
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await getCart();
    return Array.isArray(response) ? groupByCategory(response) : response || {};
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addItem = createAsyncThunk(
  "cart/addItem",
  async (item: CartItem, { dispatch }) => {
    try {
      await addToCart({ ...item, id: item.id });
      dispatch(fetchCart());
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ id }: { id: number }, { dispatch }) => {
    try {
      await removeFromCart(id);
      dispatch(fetchCart());
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.categories = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.categories = action.payload || {};
    });
  },
});

export const { clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
