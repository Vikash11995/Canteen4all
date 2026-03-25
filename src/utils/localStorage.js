// utils/localStorage.js

// 🔐 Auth
export const getAuthFromStorage = () => {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
};

export const saveAuthToStorage = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const removeAuthFromStorage = () => {
  localStorage.removeItem("currentUser");
};

// 🛒 Cart (user-specific by email)
/**
 * Get the cart items for the specific user (by email).
 * Each user's cart is stored under a unique key for isolation.
 * Only the items for the given user are returned.
 */
export const getCartFromStorage = (email) => {
  if (!email) return [];
  // Get all localstorage keys that start with "cart_"
  const cartData = localStorage.getItem(`cart_${email}`);
  if (!cartData) return [];
  try {
    // Return cart items array for this user
    return JSON.parse(cartData);
  } catch (e) {
    return [];
  }
};

/**
 * Store the cart items for only the given user by email.
 * Other users' carts will not be affected.
 */
export const saveCartToStorage = (email, cart) => {
  if (!email) return;
  localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
};