import { decryptData, encryptData } from "./encryption";


export const saveToDB = (currentConversation, userName) => {
  let conversationList = [];
  let encryptedData = localStorage.getItem('allConversationList');

  if (encryptedData) {
    conversationList = decryptData(encryptedData);;
    const userIndex = conversationList.findIndex((conv) => conv.userName === userName);

    if (userIndex !== -1) {
      const userConversations = conversationList[userIndex].conversationList;

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

    } else {
      // New user entry
      conversationList.push({
        userName,
        conversationList: [{ ...currentConversation }]
      });
    }
  } else {
    // No data in localStorage yet
    conversationList.push({
      userName,
      conversationList: [{ ...currentConversation }]
    });
  }
  const ecryptedData = encryptData(conversationList);
  localStorage.setItem('allConversationList', ecryptedData);
};


export const deleteConversationFromDB = (conversationId, userName) => {
  let conversationList = [];
  const encryptedData = localStorage.getItem('allConversationList');

  if (encryptedData) {
    conversationList = decryptData(encryptedData);

    const userIndex = conversationList.findIndex(user => user.userName === userName);

    if (userIndex !== -1) {
      // Filter out the conversation with matching id
      const userConversations = conversationList[userIndex].conversationList;
      const updatedConversations = userConversations.filter(conv => conv.id !== conversationId);

      conversationList[userIndex].conversationList = updatedConversations;
    }
  }

  const encryptedUpdated = encryptData(conversationList);
  localStorage.setItem('allConversationList', encryptedUpdated);
};
