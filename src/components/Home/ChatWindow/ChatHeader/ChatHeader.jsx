import { useSelector } from 'react-redux';
import './ChatHeader.css';
import { getConversation } from '../../../../redux/slices/conversationSlice';
import { FaDownload } from "react-icons/fa6";

const ChatHeader = () => {
    const { currentConversation } = useSelector(getConversation);

    const handleDownloadJson = () => {
        if (!currentConversation || currentConversation.length === 0) {
            alert('No conversation to download.');
            return;
        }
        const blob = new Blob([JSON.stringify(currentConversation, null, 2)], {
            type: 'application/json',
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'chat-conversation.json';
        link.click();
    };

    return (
        <div className='chat-header-container flex-item'>
            <p>{currentConversation?.title}</p>
            <FaDownload className='download-file' onClick={handleDownloadJson} />
        </div>
    )
}

export default ChatHeader