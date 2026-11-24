
import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../features/settings/settingsSlice";
import mealsReducer from "./features/meals/mealsSlice";
import moodReducer from "./features/mood/moodSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
     meals: mealsReducer,
    mood: moodReducer,
  },
});
