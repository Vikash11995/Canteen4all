
export const getAuthFromStorage = () => {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
};

export const saveAuthToStorage = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const removeAuthFromStorage = () => {
  localStorage.removeItem("currentUser");
};

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

export const saveCartToStorage = (email, cart) => {
  if (!email) return;
  localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
};