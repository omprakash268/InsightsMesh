import { createSlice } from "@reduxjs/toolkit";

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        allConversationsList: [],
        currentConversation: {
            id: null,
            title: '',
            conversation: [],
            tag: '',
            userName: ''
        }
    },
    reducers: {
        setAllConversation: (state, action) => {
            state.allConversationsList = action.payload;
        },
        addConversation: (state, action) => {
            state.allConversationsList.push(action.payload);
        },
        updateCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        }
    }
});

export const { setAllConversation, addConversation, updateCurrentConversation } = conversationSlice.actions;
export const getConversation = (state) => state.conversation;
export const conversationReducer = conversationSlice.reducer;
