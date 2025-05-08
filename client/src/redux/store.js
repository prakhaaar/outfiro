import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import shopReducer from "./shopSlice";
import filterReducer from "./filterSlice";
import authReducer from "./authSlice"; // <- Add this
import orderReducer from "./orderSlice"; // <- Add this

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    shop: shopReducer,
    filter: filterReducer,
    auth: authReducer, // <- Add this
    order: orderReducer, // <- Add this
  },
});

export default store;
