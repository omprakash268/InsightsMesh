import { configureStore } from "@reduxjs/toolkit";

// Reducers
import { conversationReducer } from "../slices/conversationSlice";
import { themeReducer } from "../slices/themeSlicer";
import {
    inputControlReducer,
    loadingReducer,
    newChatReducer,
    selectedPromptReducer
} from "../slices/generalStateSlice";

// Utilities
import { loadConversations } from "../../utils/encryption";
import { authReducer } from "../slices/authSlice";
import { storedTheme } from "../../utils/utils";

// Load persisted conversations once (avoid duplicate calls)
const initialData = loadConversations() || {
    conversationList: [],
    activeConversation: {
        id: null,
        title: '',
        conversation: [],
        tag: '',
        userName: ''
    }
};

// Configure Redux store
export const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        theme: themeReducer,
        newChat: newChatReducer,
        selectedPrompt: selectedPromptReducer,
        clearInputControl: inputControlReducer,
        loading: loadingReducer,
        auth: authReducer
    },
    preloadedState: {
        conversation: {
            allConversationsList: initialData.conversationList,
            currentConversation: initialData.activeConversation
        },
        theme: storedTheme()
    }
});

// Sync theme changes with HTML `data-theme` attribute
let previousTheme = store.getState().theme;

store.subscribe(() => {
    const currentTheme = store.getState().theme;

    if (currentTheme !== previousTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        previousTheme = currentTheme;
    }
});
