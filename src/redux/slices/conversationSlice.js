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
        },
        updateCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;

            const index = state.allConversationsList.findIndex(conv => conv.id === action.payload.id);

            if (index !== -1) {
                // Replace the object at the found index
                state.allConversationsList[index] = action.payload;
            } else {
                if (action.payload?.title?.length > 0) {
                    state.allConversationsList.push(action.payload);
                }
            }
        }
    }
});

export const { addConversation, updateCurrentConversation } = conversationSlice.actions;

export const getConversation = (state) => state.conversation;

export const conversationReducer = conversationSlice.reducer;