import { createSlice } from "@reduxjs/toolkit";

/* ------------------------------
   1. New Chat State Slice
------------------------------ */
export const newChatSlice = createSlice({
  name: 'newChat',
  initialState: true,
  reducers: {
    /**
     * Updates whether a new chat screen is active.
     * @param {boolean} action.payload
     */
    updateNewChatState: (_, action) => action.payload
  }
});

export const { updateNewChatState } = newChatSlice.actions;
export const getNewChatState = (state) => state.newChat;
export const newChatReducer = newChatSlice.reducer;

/* ------------------------------
   2. Selected Prompt State Slice
------------------------------ */
export const selectedPromptSlice = createSlice({
  name: 'selectedPrompt',
  initialState: '',
  reducers: {
    /**
     * Sets the currently selected quick prompt.
     * @param {string} action.payload
     */
    updateSelectedPromptState: (_, action) => action.payload
  }
});

export const { updateSelectedPromptState } = selectedPromptSlice.actions;
export const getselectedPromptState = (state) => state.selectedPrompt;
export const selectedPromptReducer = selectedPromptSlice.reducer;

/* ------------------------------
   3. Query Input Clear Control Slice
------------------------------ */
export const inputControlSlice = createSlice({
  name: 'clearInputControl',
  initialState: false,
  reducers: {
    /**
     * Triggers clearing the user input box.
     */
    triggerClearQuery: () => true,

    /**
     * Resets clear state to false after clearing.
     */
    resetClearQuery: () => false
  }
});

export const { triggerClearQuery, resetClearQuery } = inputControlSlice.actions;
export const getClearInputControl = (state) => state.clearInputControl;
export const inputControlReducer = inputControlSlice.reducer;

/* ------------------------------
   4. Query Loading State Slice
------------------------------ */
export const loadingSlice = createSlice({
  name: 'loading',
  initialState: { isQueryLoading: false },
  reducers: {
    /**
     * Updates the loading state for the query (true/false).
     * @param {boolean} action.payload
     */
    updateQueryLoading: (state, action) => {
      state.isQueryLoading = action.payload;
    }
  }
});

export const { updateQueryLoading } = loadingSlice.actions;
export const getLoadingState = (state) => state.loading;
export const loadingReducer = loadingSlice.reducer;
