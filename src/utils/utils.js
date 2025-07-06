export const loadConversations = () => {
    const activeConversation = { id: Date.now(), title: '', conversation: [], tag: '' };

    const conversationList = [
        {
            id: 1,
            title: "What is react ?",
            conversation: [
                {
                    id: 1,
                    content: 'What is react',
                    sender: 'user',
                    createdAt: new Date().getTime()
                },
                {
                    id: 2,
                    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
                    sender: 'bot',
                    createdAt: new Date().getTime()
                },
                {
                    id: 3,
                    content: 'What is excel',
                    sender: 'user',
                    createdAt: new Date().getTime()
                },
                {
                    id: 4,
                    content: 'Answred above check that one. Thank you.',
                    sender: 'bot',
                    createdAt: new Date().getTime()
                }
            ],
            tag: 'Internal'
        },
        {
            id: 2,
            title: "Explain physics in easy terms ?",
            conversation: [
                {
                    id: 1,
                    content: 'What is !',
                    sender: 'user',
                    createdAt: new Date().getTime()
                },
                {
                    id: 2,
                    content: `No Output.`,
                    sender: 'bot',
                    createdAt: new Date().getTime()
                },
                {
                    id: 3,
                    content: 'What is react',
                    sender: 'user',
                    createdAt: new Date().getTime()
                },
                {
                    id: 4,
                    content: 'Answred above check that one. Thank you.',
                    sender: 'bot',
                    createdAt: new Date().getTime()
                }
            ],
            tag: 'Sales'
        },
        {
            id: 3,
            title: "My name is doremon i am super robot what is my special ability ?",
            conversation: [],
            tag: 'Support'
        },
        {
            id: 4,
            title: "What is react ?",
            conversation: [],
            tag: 'Support'
        },
        {
            id: 5,
            title: "Explain physics in easy terms ?",
            conversation: [],
            tag: 'Support'
        },
        {
            id: 6,
            title: "My name is doremon i am super robot what is my special ability ?",
            conversation: [],
            tag: 'Internal'
        },
        {
            id: 7,
            title: "What is react ?",
            conversation: [],
            tag: 'Sales'
        },
        {
            id: 8,
            title: "Explain physics in easy terms ?",
            conversation: [],
            tag: 'Internal'
        },
        {
            id: 9,
            title: "My name is doremon i am super robot what is my special ability ?",
            conversation: [],
            tag: 'Internal'
        },
        {
            id: 10,
            title: "What is react ?",
            conversation: [],
            tag: 'Internal'
        },
        {
            id: 11,
            title: "Explain physics in easy terms ?",
            conversation: [],
            tag: 'Sales'
        },
        {
            id: 13,
            title: "My name is doremon i am super robot what is my special ability ?",
            conversation: [],
            tag: 'Internal'
        }
    ];

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