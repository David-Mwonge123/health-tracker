import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../features/settings/settingsSlice";
import habitReducer from "../features/habits/habitSlice";
import reminderReducer from "../features/reminders/reminderSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    habits: habitReducer,
    reminders: reminderReducer,
  },
});
