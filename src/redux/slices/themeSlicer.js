import { createSlice } from "@reduxjs/toolkit";
import { storedTheme } from "../../utils/utils";

/**
 * Redux slice to manage application theme (light/dark).
 */
export const themeSlice = createSlice({
  name: 'theme',
  initialState: storedTheme(),
  reducers: {
    /**
     * Updates the theme mode.
     * @param {string} action.payload - "light" or "dark"
     * @returns {string}
     */
    updateTheme: (_, action) => action.payload
  }
});

// Action
export const { updateTheme } = themeSlice.actions;

// Selector
export const getTheme = (state) => state.theme;

// Reducer
export const themeReducer = themeSlice.reducer;
