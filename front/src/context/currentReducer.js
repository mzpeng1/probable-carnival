import { createSlice } from '@reduxjs/toolkit';

export const currentSlice = createSlice({
    name: 'current',
    initialState: {
        value: ""
    },
    reducers: {
        setCurrent: (state, action) => {
            state.value = action.payload;
        },
        clearEvents: (state) => {
            state.value = "";
        }
    }
})

export const { setCurrent, clearCurrent } = currentSlice.actions;

export const selectCurr = state => state.events.value;

export default currentSlice.reducer;