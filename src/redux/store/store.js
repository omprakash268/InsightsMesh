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
import { userReducer } from "../slices/userSlice";

// Utilities
import { loadConversations } from "../../utils/encryption";

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
    user: userReducer,
    conversation: conversationReducer,
    theme: themeReducer,
    newChat: newChatReducer,
    selectedPrompt: selectedPromptReducer,
    clearInputControl: inputControlReducer,
    loading: loadingReducer
  },
  preloadedState: {
    conversation: {
      allConversationsList: initialData.conversationList,
      currentConversation: initialData.activeConversation
    }
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
