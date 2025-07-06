import { createSlice } from "@reduxjs/toolkit";

// Initial state for conversations
const initialState = {
  allConversationsList: [],
  currentConversation: {
    id: null,
    title: '',
    conversation: [],
    tag: '',
    userName: ''
  }
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    /**
     * Replace the entire conversation list.
     * @param {object} state 
     * @param {object} action - Array of conversation objects
     */
    setAllConversation: (state, action) => {
      state.allConversationsList = action.payload;
    },

    /**
     * Append a new conversation to the list.
     * @param {object} state 
     * @param {object} action - Single conversation object
     */
    addConversation: (state, action) => {
      state.allConversationsList.push(action.payload);
    },

    /**
     * Update the current active conversation.
     * @param {object} state 
     * @param {object} action - Conversation object
     */
    updateCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    }
  }
});

// Actions
export const {
  setAllConversation,
  addConversation,
  updateCurrentConversation
} = conversationSlice.actions;

// Selector to access conversation state
export const getConversation = (state) => state.conversation;

// Reducer export
export const conversationReducer = conversationSlice.reducer;
