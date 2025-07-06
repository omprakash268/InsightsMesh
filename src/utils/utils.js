export const loadConversations = () => {
    const activeConversation = { id: Date.now(), title: '', conversation: [], tag: '' };

    const conversationList = fetchConversationList();
    return { conversationList, activeConversation };
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

export const saveToDB = (allConversationsList) => {
    localStorage.setItem('allConversationList', JSON.stringify(allConversationsList));
}

export const fetchConversationList = () => {
    let conversationList = [];
    const data = localStorage.getItem('allConversationList');
    if (data) {
        conversationList = JSON.parse(data);
    }
    return conversationList;
}