import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/Habits/habitSlice";
import reminderReducer from "../features/Reminders/reminders/reminderSlice";

export const store = configureStore({
  reducer: {
    habits: habitReducer,
    reminders: reminderReducer,
  },
});
