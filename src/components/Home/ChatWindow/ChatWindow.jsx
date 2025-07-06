import ChatHeader from './ChatHeader/ChatHeader';
import './ChatWindow.css';
import { useSelector } from 'react-redux';
import { getConversation } from '../../../redux/slices/conversationSlice';

import { useEffect, useRef } from 'react';
import ChatItem from './ChatItem/ChatItem';

const ChatWindow = () => {
    const { currentConversation } = useSelector(getConversation);
    const chatContainerRef = useRef(null);

    // 🔁 Scroll to bottom on new message
    useEffect(() => {
        const scrollToBottom = () => {
            const el = chatContainerRef.current;
            if (el) {
                el.scrollTop = el.scrollHeight;
            }
        };

        scrollToBottom();
    }, [currentConversation]);
    return (
        <div className='chat-window-container'>
            <ChatHeader />
            <div className="chat-body flex-item" ref={chatContainerRef}>
                {
                    currentConversation.conversation.map((chat) => {
                        return <ChatItem key={chat.id} chat={chat} />
                    })
                }

            </div>
        </div>
    )
}

export default ChatWindow;