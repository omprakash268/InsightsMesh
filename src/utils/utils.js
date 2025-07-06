export const loadConversations = (userName = '') => {
  const data = localStorage.getItem('allConversationList');
  if (data) {
    const parsed = JSON.parse(data);
    const userData = parsed.find(conv => conv.userName === userName);
    if (userData) {
      return {
        conversationList: userData.conversationList,
        activeConversation: userData.conversationList[userData.conversationList.length - 1] || {
          id: Date.now(), title: '', conversation: [], tag: '', userName: ''
        }
      };
    }
  }
  return { conversationList: [], activeConversation: { id: Date.now(), title: '', conversation: [], tag: '', userName: '' } };
}


export const getQuickPromptList = () => {
    const prompts = [
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
        },
    ];

    return prompts;
}

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



export const fetchConversationList = (userName) => {
    let allConversation = [];
    const data = localStorage.getItem('allConversationList');
    if (data) {
        const conversationList = JSON.parse(data);
        const index = conversationList.findIndex((conv) => conv.userName === userName);
        if (index !== -1) {
            allConversation = conversationList[index];
        }
    }
    return allConversation;
}