import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("health-user") || "null");
const savedUsers = JSON.parse(localStorage.getItem("health-users") || "[]");

const initialState = {
  user: savedUser,
  users: savedUsers,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { name, email, password } = action.payload;
      const exists = state.users.find((u) => u.email === email);
      if (exists) {
        state.error = "Email already registered. Please login.";
        return;
      }
      const newUser = { id: Date.now(), name, email, password };
      state.users.push(newUser);
      state.user = { id: newUser.id, name, email };
      state.error = null;
      localStorage.setItem("health-users", JSON.stringify(state.users));
      localStorage.setItem("health-user", JSON.stringify(state.user));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const found = state.users.find(
        (u) => u.email === email && u.password === password,
      );
      if (!found) {
        state.error = "Wrong email or password.";
        return;
      }
      state.user = { id: found.id, name: found.name, email: found.email };
      state.error = null;
      localStorage.setItem("health-user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("health-user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { signup, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
