
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workouts: [],
};

const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {

    // Add workout
    addWorkout: (state, action) => {
      state.workouts.push(action.payload);
    },

    // Delete a workout
    deleteWorkout: (state, action) => {
      state.workouts = state.workouts.filter(
        (workout) => workout.id !== action.payload
      );
    },

    // Update an existing workout
    updateWorkout: (state, action) => {
      const index = state.workouts.findIndex(
        (workout) => workout.id === action.payload.id
      );

      if (index !== -1) {
        state.workouts[index] = action.payload;
      }
    },
  },
});

export const { addWorkout, deleteWorkout, updateWorkout } =
  workoutSlice.actions;

export default workoutSlice.reducer;
