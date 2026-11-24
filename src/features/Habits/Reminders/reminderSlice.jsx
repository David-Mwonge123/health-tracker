import { createSlice } from "@reduxjs/toolkit";

const initialState = { reminders: [] };
const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      state.reminders.push(action.paylod);
    },
    toggleReminder: (state, action) => {
        const r = state.reminders.find(x => x.id === action.payload)
        if (r) r.enabled = !r.enabled
    },
    deleteReminder: (state, action) => {
        state.reminders = state.reminders.filter(x => x.id !== action.payload)
    },
  },
});

export const {addReminder, toggleReminder, deleteReminder} = reminderSlice.actions
export default reminderSlice.reducer
