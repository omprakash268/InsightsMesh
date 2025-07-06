import { decryptData, encryptData } from "./encryption";

/**
 * Saves or updates a single conversation in localStorage, encrypted per user.
 * @param {object} currentConversation - The conversation to save.
 * @param {string} userName - The user identifier (e.g. email).
 */
export const saveToDB = (currentConversation, userName) => {
  if (!currentConversation || !userName) return;

  const encryptedData = localStorage.getItem('allConversationList');
  let conversationList = encryptedData ? decryptData(encryptedData) : [];

  if (!Array.isArray(conversationList)) conversationList = [];

  const userIndex = conversationList.findIndex((u) => u.userName === userName);

  if (userIndex !== -1) {
    const userConversations = conversationList[userIndex].conversationList || [];

    const existingConvIndex = userConversations.findIndex(
      (conv) => conv.id === currentConversation.id
    );

    if (existingConvIndex !== -1) {
      // Update existing conversation
      userConversations[existingConvIndex] = { ...currentConversation };
    } else {
      // Add new conversation
      userConversations.push({ ...currentConversation });
    }

    conversationList[userIndex].conversationList = userConversations;
  } else {
    // New user entry
    conversationList.push({
      userName,
      conversationList: [{ ...currentConversation }]
    });
  }

  const updatedEncrypted = encryptData(conversationList);
  localStorage.setItem('allConversationList', updatedEncrypted);
};

/**
 * Deletes a conversation for a specific user from encrypted localStorage.
 * @param {string|number} conversationId - ID of the conversation to delete.
 * @param {string} userName - The user identifier.
 */
export const deleteConversationFromDB = (conversationId, userName) => {
  if (!conversationId || !userName) return;

  const encryptedData = localStorage.getItem('allConversationList');
  let conversationList = encryptedData ? decryptData(encryptedData) : [];

  if (!Array.isArray(conversationList)) return;

  const userIndex = conversationList.findIndex(user => user.userName === userName);
  if (userIndex === -1) return;

  const existingUserConversations = conversationList[userIndex].conversationList || [];
  const updatedConversations = existingUserConversations.filter(conv => conv.id !== conversationId);

  conversationList[userIndex].conversationList = updatedConversations;

  const updatedEncrypted = encryptData(conversationList);
  localStorage.setItem('allConversationList', updatedEncrypted);
};
