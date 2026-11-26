
import { createSlice, nanoid } from "@reduxjs/toolkit";

const getToday = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();

  return new Date(d.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 10);
};

const initialState = {
  dailyGoal: 2500,
  entries: [],
  waterEntries: []
};

const mealsSlice = createSlice({
  name: "meals",
  initialState,

  reducers: {
    addMeal: {
      reducer(state, action) {
        state.entries.push(action.payload);
      },
      prepare(meal) {
        return {
          payload: {
            id: nanoid(),
            ...meal,
            date: meal.date || getToday(),
            createdAt: new Date().toISOString()
          }
        };
      }
    },

    updateMeal(state, action) {
      const index = state.entries.findIndex(
        meal => meal.id === action.payload.id
      );

      if (index !== -1) {
        state.entries[index] = {
          ...state.entries[index],
          ...action.payload
        };
      }
    },

    deleteMeal(state, action) {
      state.entries = state.entries.filter(
        meal => meal.id !== action.payload
      );
    },

    addWater: {
      reducer(state, action) {
        state.waterEntries.push(action.payload);
      },
      prepare(amount) {
        return {
          payload: {
            id: nanoid(),
            amount: Number(amount),
            date: getToday(),
            createdAt: new Date().toISOString()
          }
        };
      }
    },

    removeWater(state, action) {
      let remaining = Number(action.payload);
      const today = getToday();

      if (!Number.isFinite(remaining) || remaining <= 0) return;

      for (let i = state.waterEntries.length - 1; i >= 0; i--) {
        const entry = state.waterEntries[i];

        if (entry.date !== today) continue;

        const reduction = Math.min(
          Number(entry.amount) || 0,
          remaining
        );

        entry.amount -= reduction;
        remaining -= reduction;

        if (entry.amount <= 0) {
          state.waterEntries.splice(i, 1);
        }

        if (remaining <= 0) break;
      }
    },

    setWaterGoal(state, action) {
      const goal = Number(action.payload);

      if (Number.isFinite(goal) && goal > 0) {
        state.dailyGoal = goal;
      }
    }
  }
});

export const {
  addMeal,
  updateMeal,
  deleteMeal,
  addWater,
  removeWater,
  setWaterGoal
} = mealsSlice.actions;

export default mealsSlice.reducer;
