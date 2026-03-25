// features/auth/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  getAuthFromStorage,
  saveAuthToStorage,
  removeAuthFromStorage,
} from "../../utils/localStorage";

// For developing: Start with a dummy account
const DUMMY_ACCOUNT = { email: "test123@gmail.com", password: "dev1234" };

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
      const { email, password } = action.payload;
      const exists = state.users.some((u) => u.email === email);
      if (exists) {
        alert("User already exists. Please login.");
        return;
      }
      const newUser = { email, password };
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
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;