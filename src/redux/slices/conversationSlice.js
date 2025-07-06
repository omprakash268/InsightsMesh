import { createSlice } from "@reduxjs/toolkit";
import { saveToDB } from "../../utils/utils";

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
            const userName = action.payload.userName;
            saveToDB(state.allConversationsList, userName);
        },
        updateCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        }
    }
});

export const { setAllConversation, addConversation, updateCurrentConversation } = conversationSlice.actions;
export const getConversation = (state) => state.conversation;
export const conversationReducer = conversationSlice.reducer;
