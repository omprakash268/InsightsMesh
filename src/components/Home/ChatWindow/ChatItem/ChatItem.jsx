import React from 'react';
import dayjs from 'dayjs';
import './ChatItem.css';
import { FaRobot } from "react-icons/fa";
import DotLoader from './DotLoader/DotLoader';
import TypingMarkdown from './TypingMarkdown/TypingMarkdown';

const ChatItem = ({ chat }) => {
    return (
        <div key={chat.id} className={`chat-wrapper`}>
            <div className={`chat-wrapper-inner flex-item gemini-response ${chat.sender}`}>
                {chat.sender == 'bot' && <FaRobot className='bot-icon' />}
                <div className={`${chat.sender}-reply flex-item`}>
                    {
                        (chat.sender == 'bot' && chat.content == '') ? <DotLoader /> : null
                    }
                    {
                        (chat.sender == 'bot' && chat.content != '') ? <TypingMarkdown content={chat.content} /> : null
                    }
                    {
                        chat.sender == 'user' ? chat.content : null
                    }
                    <span className="timestamp">
                        {dayjs(chat.createdAt).format('DD MMM YYYY, hh:mm A')}
                    </span>
                </div>
                {chat.sender == 'user' && <div className="user-icon flex-item">UK</div>}
            </div>

        </div>
    )
}

export default ChatItem