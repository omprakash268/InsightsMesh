export const saveToDB = (currentConversation, userName) => {
  let conversationList = [];
  const data = localStorage.getItem('allConversationList');

  if (data) {
    conversationList = JSON.parse(data);
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

  localStorage.setItem('allConversationList', JSON.stringify(conversationList));
};