import { decryptData } from "./encryption";

/**
 * Returns a static list of quick prompt templates for user convenience.
 * @returns {Array<{id: number, content: string, subText: string}>}
 */
export const getQuickPromptList = () => [
  {
    id: 1,
    content: 'Ask me anything – coding help, writing, or just a random question.',
    subText: ''
  },
  {
    id: 2,
    content: 'Give me a quick summary of this text:',
    subText: 'Paste any paragraph, article, or notes here.'
  },
  {
    id: 3,
    content: 'Help me write a professional message or email.',
    subText: ''
  },
  {
    id: 4,
    content: `Explain [any topic] like I'm five.`,
    subText: 'e.g., Explain recursion, inflation, or gravity in simple terms.'
  },
  {
    id: 5,
    content: 'Brainstorm ideas for [project, content, startup, etc.].',
    subText: ''
  },
  {
    id: 6,
    content: 'What’s a good way to solve this problem?',
    subText: 'Describe a situation or drop in a coding challenge.'
  }
];

/**
 * Fetches the conversation list for a given user from localStorage.
 * Decrypts the stored data before accessing.
 * 
 * @param {string} userName - User identifier (usually email)
 * @returns {object} user conversation data or empty object if not found
 */
export const fetchConversationList = (userName) => {
  try {
    const data = localStorage.getItem('allConversationList');
    if (!data) return {};

    const conversationList = decryptData(data);
    if (!Array.isArray(conversationList)) return {};

    const userConversation = conversationList.find(conv => conv.userName === userName);
    return userConversation || {};
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    return {};
  }
};
