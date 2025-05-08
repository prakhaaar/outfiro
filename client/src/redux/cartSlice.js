import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (token) => {
    const response = await axios.post(
      `${backendUrl}/api/cart/get`,
      {},
      {
        headers: { token },
      }
    );
    return response.data.cartData;
  }
);

const initialState = {
  cartItems: {},
  status: "idle",
  error: null,
  currency: "$",
  delivery_charges: 10,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { itemId, size } = action.payload;
      if (!state.cartItems[itemId]) state.cartItems[itemId] = {};
      if (!state.cartItems[itemId][size]) state.cartItems[itemId][size] = 0;
      state.cartItems[itemId][size] += 1;
    },
    updateQuantity: (state, action) => {
      const { itemId, size, quantity } = action.payload;
      state.cartItems[itemId][size] = quantity;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCurrency = (state) => state.cart.currency;
export const selectDeliveryCharges = (state) => state.cart.delivery_charges;
export const selectProducts = (state) => state.products.products;

export const selectCartAmount = createSelector(
  [selectCartItems, selectProducts],
  (cartItems, products) => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size] * product.price;
      }
    }
    return total;
  }
);

export const { addToCart, updateQuantity, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
