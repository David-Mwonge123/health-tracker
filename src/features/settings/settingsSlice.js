
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Mark",
  theme: "light",
  dailyWaterGoal: 2000,
  dailySleepGoal: 8,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },

    updateTheme: (state, action) => {
      state.theme = action.payload;
    },

    updateWaterGoal: (state, action) => {
      state.dailyWaterGoal = action.payload;
    },

    updateSleepGoal: (state, action) => {
      state.dailySleepGoal = action.payload;
    },

    resetSettings: () => initialState,
  },
});

export const {
  updateName,
  updateTheme,
  updateWaterGoal,
  updateSleepGoal,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
