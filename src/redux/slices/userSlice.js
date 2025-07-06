import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing the current user's email/username.
 */
export const userSlice = createSlice({
  name: 'user',
  initialState: 'test@test.com',
  reducers: {
    /**
     * Updates the user's email or username.
     * @param {string} action.payload - New user identifier
     */
    updateUser: (_, action) => action.payload
  }
});

// Action
export const { updateUser } = userSlice.actions;

// Selector
export const getUserName = (state) => state.user;

// Reducer
export const userReducer = userSlice.reducer;
