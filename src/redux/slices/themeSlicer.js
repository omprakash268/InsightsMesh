import { createSlice } from "@reduxjs/toolkit";

export const themeSlicer = createSlice({
    name: 'theme',
    initialState: 'light',
    reducers: {
        updateTheme: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});

export const { updateTheme } = themeSlicer.actions;

export const getTheme = (state) => state.theme;

export const themeReducer = themeSlicer.reducer;