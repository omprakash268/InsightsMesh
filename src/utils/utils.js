
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

export const saveToDB = (currentConversationsList, userName) => {
    let conversationList = [];
    const data = localStorage.getItem('allConversationList');
    if (data) {
        conversationList = JSON.parse(data);

        const index = conversationList.findIndex((conv) => conv.userName === userName);
        if (index !== -1) {
            conversationList[index] = { userName, conversationList: currentConversationsList };
        } else {
            conversationList.push(currentConversationsList);
        }
    } else {
        conversationList.push({ userName, conversationList: currentConversationsList });
    }

    localStorage.setItem('allConversationList', JSON.stringify(conversationList));
}


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