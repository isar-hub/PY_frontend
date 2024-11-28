import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    contactNumber: "",
  },
  isCartOpen: false,
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;

      const existingIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingIndex !== -1) {
        state.cartItems[existingIndex] = action.payload; // Update existing item
      } else {
        state.cartItems.push(action.payload); // Add new item
      }

      state.isCartOpen = true;
      state.loading = false;
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },

    calculatePrice: (state) => {
      const subtotal = state.cartItems.reduce(
        (total, item) => total + item.sellingPrice * item.quantity,
        0
      );

      state.subtotal = subtotal;
      if (state.cartItems.length === 0) {
        state.shippingCharges = 0;
      } else if (state.subtotal < 1000) {
        state.shippingCharges = 0;
      } else {
        state.shippingCharges = 0;
      }

      state.tax = Math.round(state.subtotal * 0.01027);
      state.total = state.subtotal + state.shippingCharges - state.discount;
    },

    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    toggleCartSidebar: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  toggleCartSidebar,
  resetCart,
} = cartReducer.actions;
