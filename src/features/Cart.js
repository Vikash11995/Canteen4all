
  import { createSlice } from "@reduxjs/toolkit";

// Util functions to handle localStorage for cart items
const CART_LOCAL_STORAGE_KEY = 'cart_items';

// Load items from localStorage or default to empty array
const loadCartItems = () => {
  try {
    const items = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (e) {
    return [];
  }
};

// Save items to localStorage
const saveCartItems = (items) => {
  try {
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    // fail silently
  }
};

const initialState = {
  items: loadCartItems(),
  CartTabStatus: false,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity } = action.payload;
      const productIndexId = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (productIndexId >= 0) {
        state.items[productIndexId].quantity += quantity;
      } else {
        state.items.push({ productId, quantity });
      }
      saveCartItems(state.items);
    },

    toggleCartTab(state) {
      state.CartTabStatus = !state.CartTabStatus;
    },

    changeQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const productIndexId = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (productIndexId >= 0) {
        if (quantity > 0) {
          state.items[productIndexId].quantity = quantity;
        } else {
          state.items = state.items.filter(item => item.productId !== productId);
        }
        saveCartItems(state.items);
      }
    },

    deleteFromCart(state, action) {
      const { productId } = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
      saveCartItems(state.items);
    },
  },
});

export const { addToCart, toggleCartTab, changeQuantity, deleteFromCart } = CartSlice.actions;
export default CartSlice.reducer;
