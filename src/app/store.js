
import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";

export const clearHealthData = createAction("app/clearHealthData");

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

  // Ensure older saved data has the required water state
  if (preloadedState) {
    preloadedState.meals = {
      dailyGoal: 2500,
      entries: [],
      ...preloadedState.meals,
      waterEntries: preloadedState.meals?.waterEntries || []
    };
  }
} catch (error) {
  console.error("Error loading saved state:", error);
  preloadedState = undefined;
}

const appReducer = combineReducers({
  settings: settingsReducer,
  meals: mealsReducer,
  mood: moodReducer,
  workouts: workoutReducer,
  habits: habitReducer,
  reminders: reminderReducer,
  auth: authReducer,
  sleep: sleepReducer,
});

const rootReducer = (state, action) => {
  if (action.type === clearHealthData.type) {
    state = {
      ...state,
      settings: undefined,
      meals: undefined,
      mood: undefined,
      workouts: undefined,
      habits: undefined,
      reminders: undefined,
      sleep: undefined,
    };
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem(
    "health-tracker-state",
    JSON.stringify(store.getState()),
  );
});
