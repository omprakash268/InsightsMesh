import { createSlice } from "@reduxjs/toolkit";

// Start new chat state 
export const newChatSlice = createSlice({
    name: 'newChat',
    initialState: true,
    reducers: {
        updateNewChatState: (state, action) => action.payload
    }
});

export const { updateNewChatState } = newChatSlice.actions;
export const getNewChatState = (state) => state.newChat;
export const newChatReducer = newChatSlice.reducer;


// Selected prompt state 
export const selectedPromptSlice = createSlice({
    name: 'selectedPrompt',
    initialState: '',
    reducers: {
        updateSelectedPromptState: (state, action) => action.payload
    }
});

export const { updateSelectedPromptState } = selectedPromptSlice.actions;
export const getselectedPromptState = (state) => state.selectedPrompt;
export const selectedPromptReducer = selectedPromptSlice.reducer;

// Query input control
export const inputControlSlice = createSlice({
    name: 'clearInputControl',
    initialState: false,
    reducers: {
        triggerClearQuery: (state) => {
            state = true;
            return state;
        },
        resetClearQuery: (state) => {
            state = false;
            return state;
        },
    },
});

export const { triggerClearQuery, resetClearQuery } = inputControlSlice.actions;
export const getClearInputControl = (state) => state.clearInputControl;
export const inputControlReducer = inputControlSlice.reducer;