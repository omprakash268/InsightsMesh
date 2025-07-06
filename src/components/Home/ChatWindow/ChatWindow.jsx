import ChatHeader from './ChatHeader/ChatHeader';
import './ChatWindow.css';
import { useSelector } from 'react-redux';
import { getConversation } from '../../../redux/slices/conversationSlice';
import { FaRobot } from "react-icons/fa";
import { useEffect, useRef } from 'react';

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
                        return <div key={chat.id} className={`chat-wrapper flex-item ${chat.sender}`}>
                            {chat.sender == 'bot' && <FaRobot className='bot-icon' />}
                            <div className={`${chat.sender}-reply flex-item`}>
                                {chat.content}
                            </div>
                            {chat.sender == 'user' && <div className="user-icon flex-item">UK</div>}
                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default ChatWindow;