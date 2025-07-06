import { createSlice } from "@reduxjs/toolkit";
import { saveToDB } from "../../utils/utils";


export const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        allConversationsList: { id: Date.now(), title: '', conversation: [], tag: '', userName: '' },
        currentConversation: []
    },
    reducers: {
        setConversation: (state, action) => {
            state.allConversationsList = action.payload;
        },
        addConversation: (state, action) => {
            state.allConversationsList.push(action.payload);
            const userName = action.payload.userName;

            saveToDB(state.allConversationsList, userName);
        },
        updateCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;

            const userName = action.payload.userName;
            const index = state.allConversationsList.findIndex(conv => conv.id === action.payload.id);

            if (index !== -1) {
                state.allConversationsList[index] = action.payload;
            } else if (action.payload?.title?.length > 0) {
                state.allConversationsList.push(action.payload);
            }

            saveToDB(state.allConversationsList, userName);
        }
    }
});

export const { setConversation, addConversation, updateCurrentConversation } = conversationSlice.actions;

export const getConversation = (state) => state.conversation;

export const conversationReducer = conversationSlice.reducer;