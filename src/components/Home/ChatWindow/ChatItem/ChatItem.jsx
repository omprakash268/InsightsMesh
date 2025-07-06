import './ChatItem.css';
import { FaRobot } from "react-icons/fa";

const ChatItem = ({ chat }) => {
    return (
        <div key={chat.id} className={`chat-wrapper`}>
            <div className={`chat-wrapper-inner flex-item ${chat.sender}`}>
                {chat.sender == 'bot' && <FaRobot className='bot-icon' />}
                <div className={`${chat.sender}-reply flex-item`}>
                    {chat.content}
                </div>
                {chat.sender == 'user' && <div className="user-icon flex-item">UK</div>}
            </div>
        </div>
    )
}

export default ChatItem