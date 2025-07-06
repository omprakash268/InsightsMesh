import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Default empty conversation structure
const defaultConversationData = {
  conversationList: [],
  activeConversation: {
    id: Date.now(),
    title: '',
    conversation: [],
    tag: '',
    userName: '',
    createdAt: Date.now()
  }
};

/**
 * Encrypts a JavaScript object into an AES-encrypted string.
 * @param {any} data - Data to encrypt
 * @returns {string} - Encrypted string
 */
export const encryptData = (data) => {
  if (!SECRET_KEY) {
    console.warn("SECRET_KEY is not defined");
    return '';
  }

  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  } catch (e) {
    console.error("Encryption failed:", e);
    return '';
  }
};

/**
 * Decrypts an AES-encrypted string into a JavaScript object.
 * @param {string} ciphertext
 * @returns {any|null} - Decrypted object or null on error
 */
export const decryptData = (ciphertext) => {
  if (!SECRET_KEY || !ciphertext) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (e) {
    console.error("Decryption failed:", e);
    return null;
  }
};

/**
 * Loads and decrypts the current user's conversations from localStorage.
 * @param {string} userName - Email or username of the user
 * @returns {object} - { conversationList, activeConversation }
 */
export const loadConversations = (userName = 'test@test.com') => {
  try {
    const encryptedData = localStorage.getItem('allConversationList');
    if (!encryptedData) return defaultConversationData;

    const decryptedList = decryptData(encryptedData);
    if (!Array.isArray(decryptedList)) return defaultConversationData;

    const userData = decryptedList.find(conv => conv.userName === userName);
    if (userData && Array.isArray(userData.conversationList)) {
      return {
        conversationList: userData.conversationList,
        activeConversation: {
          id: Date.now(),
          title: '',
          conversation: [],
          tag: '',
          userName,
          createdAt: Date.now()
        }
      };
    }
  } catch (e) {
    console.error("Failed to load conversations:", e);
  }

  return defaultConversationData;
};
