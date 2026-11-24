
import { createSlice, nanoid } from "@reduxjs/toolkit";

const getToday = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 10);
};

const initialState = {
  entries: []
};

const moodSlice = createSlice({
  name: "mood",
  initialState,

  reducers: {
    addMood: {
      reducer(state, action) {
        state.entries.push(action.payload);
      },
      prepare(entry) {
        return {
          payload: {
            id: nanoid(),
            ...entry,
            date: entry.date || getToday(),
            createdAt: new Date().toISOString()
          }
        };
      }
    },

    updateMood(state, action) {
      const index = state.entries.findIndex(
        item => item.id === action.payload.id
      );

      if (index !== -1) {
        state.entries[index] = {
          ...state.entries[index],
          ...action.payload
        };
      }
    },

    deleteMood(state, action) {
      state.entries = state.entries.filter(
        item => item.id !== action.payload
      );
    }
  }
});

export const {
  addMood,
  updateMood,
  deleteMood
} = moodSlice.actions;

export default moodSlice.reducer;
