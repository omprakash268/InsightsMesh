import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  return ciphertext;
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
  } catch (e) {
    console.error("Decryption failed", e);
    return null;
  }
};

export const loadConversations = (userName = 'test@test.com') => {
  const data = localStorage.getItem('allConversationList');
  if (data) {

    const decryptedData = decryptData(data);
    const userData = decryptedData.find(conv => conv.userName === userName);

    if (userData) {
      return {
        conversationList: userData.conversationList,
        activeConversation: {
          id: Date.now(), title: '', conversation: [], tag: '', userName: '', createdAt: Date.now()
        }
      };
    }
  }
  return { conversationList: [], activeConversation: { id: Date.now(), title: '', conversation: [], tag: '', userName: '', createdAt: Date.now() } };
}

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