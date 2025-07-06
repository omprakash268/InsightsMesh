import React from 'react';
import dayjs from 'dayjs';
import './ChatItem.css';
import { FaRobot } from 'react-icons/fa';
import DotLoader from './DotLoader/DotLoader';
import TypingMarkdown from './TypingMarkdown/TypingMarkdown';

/**
 * ChatItem Component
 * Renders a single chat message from either the user or bot.
 *
 * @param {Object} chat - Chat message object
 * @param {string} chat.id - Unique identifier
 * @param {string} chat.sender - 'user' or 'bot'
 * @param {string} chat.content - Message content
 * @param {string} chat.createdAt - ISO timestamp
 */
const ChatItem = ({ chat }) => {
  const { sender, content, createdAt } = chat;

  const isBot = sender === 'bot';
  const isUser = sender === 'user';

  return (
    <div key={chat.id} className="chat-wrapper">
      <div className={`chat-wrapper-inner flex-item gemini-response ${sender}`}>
        
        {/* Bot Avatar */}
        {isBot && <FaRobot className="bot-icon" title="Bot" />}

        {/* Message Bubble */}
        <div className={`${sender}-reply flex-item`} aria-label={`${sender}-message`}>
          {isBot && content === '' && <DotLoader />}
          {isBot && content !== '' && <TypingMarkdown content={content} />}
          {isUser && <span>{content}</span>}

          <span className="timestamp" aria-label="timestamp">
            {dayjs(createdAt).format('DD MMM YYYY, hh:mm A')}
          </span>
        </div>

        {/* User Avatar */}
        {isUser && (
          <div className="user-icon flex-item" title="User">
            UK
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
