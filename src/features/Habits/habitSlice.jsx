import { createSlice } from "@reduxjs/toolkit";

const initialState = { habits: [] };
const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    toggleHabit: (state, action) => {
      const h = state.habits.find((x) => x.id === action.payload);
      if (h) {
        h.done = !h.done;
        h.streak = h.done ? h.streak + 1 : Math.max(0, h.streak - 1);
      }
    },
    deleteHabit: (state, action) => {
      state.habits = state.habits.filter((x) => x.id !== action.paylod);
    },
  },
});

export const { addHabit, toggleHabit, deleteHabit } = habitSlice.actions;
export default habitSlice.reducer;
