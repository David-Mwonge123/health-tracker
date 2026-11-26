import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "../features/settings/settingsSlice";
import mealsReducer from "../features/meals/mealsSlice";
import moodReducer from "../features/mood/moodSlice";
import workoutReducer from "../features/workouts/workoutsSlice";
import habitReducer from "../features/habits/habitSlice";
import reminderReducer from "../features/reminders/reminderSlice";
import authReducer from "../features/auth/authSlice";
import sleepReducer from "../features/sleep/sleepSlice"

let preloadedState;
try {
  const saved = localStorage.getItem("health-tracker-state");
  preloadedState = saved ? JSON.parse(saved) : undefined;
} catch {
  preloadedState = undefined;
}

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    meals: mealsReducer,
    mood: moodReducer,
    workouts: workoutReducer,
    habits: habitReducer,
    reminders: reminderReducer,
    auth: authReducer,
    sleep: sleepReducer,
  },
  preloadedState,
});
store.subscribe(() => {
  localStorage.setItem(
    "health-tracker-state",
    JSON.stringify(store.getState()),
  );
});
