import { createSlice } from "@reduxjs/toolkit";
import { loadConversations } from "../../utils/utils";


export const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        allConversationsList: loadConversations().conversationList,
        currentConversation: loadConversations().activeConversation
    },
    reducers: {
        addConversation: (state, action) => {
            state.allConversationsList = action.payload;
            return state;
        },
        updateCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
            let conversation = state.allConversationsList.find((conv) => conv.id === action.payload.id);
            if (conversation) {
                conversation = action.payload;
            } else {
                if (action.payload?.title.length > 0) {
                    state.allConversationsList.push(action.payload);
                }
            }
            return state;
        }
    }
});

export const { addConversation, updateCurrentConversation } = conversationSlice.actions;

export const getConversation = (state) => state.conversation;

export const conversationReducer = conversationSlice.reducer;