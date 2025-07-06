import { configureStore } from "@reduxjs/toolkit";
import { conversationReducer } from "../slices/conversationSlice";
import { loadConversations } from "../../utils/utils";
import { themeReducer } from "../slices/themeSlicer";
import { inputControlReducer, newChatReducer, selectedPromptReducer } from "../slices/generalStateSlice";


export const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        theme: themeReducer,
        newChat: newChatReducer,
        selectedPrompt: selectedPromptReducer,
        clearInputControl: inputControlReducer
    },
    preloadedState: {
        conversation: {
            allConversationsList: loadConversations().conversationList,
            currentConversation: loadConversations().activeConversation
        },
    }
});

// Track the last theme
let previousTheme = store.getState().theme;

store.subscribe(() => {
    const state = store.getState();
    const currentTheme = state.theme;

    if (currentTheme !== previousTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        previousTheme = currentTheme;
    }
});