// features/auth/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  getAuthFromStorage,
  saveAuthToStorage,
  removeAuthFromStorage,
} from "../../utils/localStorage";

// Helper function to generate a unique referral code


// For developing: Start with a dummy account
const DUMMY_ACCOUNT = { email: "test123@gmail.com", password: "dev1234", name: "Test User", referralCode: "ABCDEFGH" };

const USERS_KEY = "canteen_users";
const loadUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    if (users) {
      return JSON.parse(users);
    } else {
      // Seed with dummy user if not present
      localStorage.setItem(USERS_KEY, JSON.stringify([DUMMY_ACCOUNT]));
      return [DUMMY_ACCOUNT];
    }
  } catch (e) {
    localStorage.setItem(USERS_KEY, JSON.stringify([DUMMY_ACCOUNT]));
    return [DUMMY_ACCOUNT];
  }
};

const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    // handle error if needed
  }
};

const initialState = {
  currentUser: getAuthFromStorage(),
  users: loadUsers(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      // Accepts more fields besides email and password
      const { email, password, name, ...rest } = action.payload;
      const exists = state.users.some((u) => u.email === email);
      if (exists) {
        alert("User already exists. Please login.");
        return;
      }
      // Generate unique referral code for new user
      let referralCode;
      let attempts = 100;
      do {
        referralCode = generateReferralCode(8);
        attempts--;
      } while (
        state.users.some((u) => u.referralCode === referralCode) && attempts > 0
      );
      if (!referralCode) {
        referralCode = generateReferralCode(8); // fallback
      }
      const newUser = { email, password, name: name || email, referralCode, ...rest };
      state.users.push(newUser);
      state.currentUser = newUser;
      saveUsers(state.users);
      saveAuthToStorage(newUser);
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const users = state.users.length === 0 ? loadUsers() : state.users;
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (found) {
        state.currentUser = found;
        saveAuthToStorage(found);
      } else {
        alert("Invalid credentials");
      }
    },

    logout: (state) => {
      state.currentUser = null;
      removeAuthFromStorage();
    },

    // Add an updateProfile reducer to allow updating of user info, excluding referralCode and email fields
    updateProfile: (state, action) => {
      const updatedFields = action.payload;
      if (!state.currentUser) return;
      const idx = state.users.findIndex(u => u.email === state.currentUser.email);
      if (idx !== -1) {
        // Prevent updating email and referralCode
        const safeUpdates = { ...updatedFields };
        delete safeUpdates.email;
        delete safeUpdates.referralCode;
        state.users[idx] = { ...state.users[idx], ...safeUpdates };
        state.currentUser = { ...state.currentUser, ...safeUpdates };
        saveUsers(state.users);
        saveAuthToStorage(state.currentUser);
      }
    }
  },
});

export const { signup, login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;