import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatItem from './ChatItem/ChatItem';
import { getConversation } from '../../../redux/slices/conversationSlice';
import './ChatWindow.css';

/**
 * ChatWindow
 * Renders the chat UI including header and scrollable chat messages.
 */
const ChatWindow = () => {
  const { currentConversation } = useSelector(getConversation);
  const chatContainerRef = useRef(null);

  // 🔁 Auto-scroll to bottom when messages change
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
    <div className="chat-window-container">
      <ChatHeader />

      <div className="chat-body flex-item" ref={chatContainerRef}>
        {Array.isArray(currentConversation?.conversation) && currentConversation.conversation.length > 0 ? (
          currentConversation.conversation.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
