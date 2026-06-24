import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  orders: {
    history: [], // Store order history
  },
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.cart.find((i) => i.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push(product);
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
    placeOrder(state, action) {
      const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const order = {
        items: [...state.cart],
        total,
        date: new Date().toLocaleString(),
        ...action.payload, // Include additional details like address and payment method
      };
      state.orders.history.push(order);
      state.cart = [];
    },
    cancelOrder(state, action) {
      // Remove the order from the history based on its index
      state.orders.history = state.orders.history.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, placeOrder, cancelOrder } = CartSlice.actions;
export default CartSlice.reducer;