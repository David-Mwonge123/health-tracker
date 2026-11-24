
import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../features/settings/settingsSlice";
import workoutReducer from "../features/workouts/workoutsSlice";
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    workouts: workoutReducer,
  },
});
