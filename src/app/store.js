
import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "../features/settings/settingsSlice";
import mealsReducer from "../features/meals/mealsSlice";
import moodReducer from "../features/mood/moodSlice";
import workoutReducer from "../features/workouts/workoutsSlice";
import habitReducer from "../features/habits/habitSlice";
import reminderReducer from "../features/reminders/reminderSlice";
import mealsReducer from '../features/meals/mealSlice';
import moodReducer from '../features/mood/moodSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    meals: mealsReducer,
    mood: moodReducer,
    workouts: workoutReducer,
    habits: habitReducer,
    reminders: reminderReducer,
  },
});
