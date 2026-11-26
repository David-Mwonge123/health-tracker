
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sleepRecords: [],
};

const sleepSlice = createSlice({
    name: "sleep",
    initialState,
    reducers: {
        addSleepRecord: (state, action) => {
            state.sleepRecords.push(action.payload);
        },

        updateSleepRecord: (state, action) => {
            const index = state.sleepRecords.findIndex(
                (record) => record.id === action.payload.id
            );

            if (index !== -1) {
                state.sleepRecords[index] = action.payload;
            }
        },

        deleteSleepRecord: (state, action) => {
            state.sleepRecords = state.sleepRecords.filter(
                (record) => record.id !== action.payload
            );
        },
    },
});

export const {
    addSleepRecord,
    updateSleepRecord,
    deleteSleepRecord,
} = sleepSlice.actions;

export default sleepSlice.reducer;
