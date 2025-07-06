import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ChatHeader.css';
import { FaDownload } from 'react-icons/fa6';
import { FaEdit, FaCheckCircle } from 'react-icons/fa';
import { getConversation, updateCurrentConversation } from '../../../../redux/slices/conversationSlice';
import { useUpdateConversation } from '../../../../hook/useUpdateConversation';

const ChatHeader = () => {
    const dispatch = useDispatch();
    const updateConversationList = useUpdateConversation();
    const { currentConversation } = useSelector(getConversation);

    const [selectedTag, setSelectedTag] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');

    const tags = ['Support', 'Sales', 'Internal'];

    // Handles tag change and syncs with Redux + DB
    const handleChange = (e) => {
        const value = e.target.value;
        if (currentConversation?.tag === value) return;

        const updatedData = { ...currentConversation, tag: value };
        setSelectedTag(value);
        dispatch(updateCurrentConversation(updatedData));
        updateConversationList(updatedData);
    };

    // Download current conversation as a .json file
    const handleDownloadJson = () => {
        if (!currentConversation || Object.keys(currentConversation).length === 0) {
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

    // Enables title editing mode
    const renameTitle = () => setIsEditing(true);

    // Title input change handler
    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Saves updated title
    const updateTitle = () => {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) return;

        const updatedData = { ...currentConversation, title: trimmedTitle };
        dispatch(updateCurrentConversation(updatedData));
        updateConversationList(updatedData);
        setIsEditing(false);
    };

    // Sync local state with Redux when conversation updates
    useEffect(() => {
        if (currentConversation) {
            setSelectedTag(currentConversation.tag || '');
            setTitle(currentConversation.title || '');
        }
    }, [currentConversation]);

    return (
        <div className='chat-header-container flex-item'>

            {/* Title Section */}
            <div className="title-wrapper flex-item">
                {isEditing ? (
                    <>
                        <input
                            id='title-input-1'
                            className='title-input'
                            type="text"
                            value={title}
                            onChange={onTitleChange}
                            placeholder="Enter title..."
                            aria-label="Edit title"
                            autoFocus
                        />
                        <FaCheckCircle
                            className='tick-icon'
                            title="Save title"
                            onClick={updateTitle}
                            role="button"
                            tabIndex={0}
                        />
                    </>
                ) : (
                    <div className='title text-elipsis flex-item' title={currentConversation?.title}>
                        {currentConversation?.title}
                        <FaEdit
                            className='edit-icon'
                            title="Edit title"
                            onClick={renameTitle}
                            role="button"
                            tabIndex={0}
                        />
                    </div>
                )}
            </div>

            {/* Tag Dropdown + Download Button */}
            <div className="tag-container flex-item">
                <div className="dropdown-wrapper">
                    <select
                        value={selectedTag}
                        onChange={handleChange}
                        className={`dropdown-select ${selectedTag.toLowerCase()}`}
                        aria-label="Select conversation tag"
                    >
                        <option value="" disabled>Select a tag</option>
                        {tags.map(tag => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>
                <FaDownload
                    className='download-file'
                    title="Download conversation"
                    onClick={handleDownloadJson}
                    role="button"
                    tabIndex={0}
                />
            </div>

        </div>
    );
};

export default ChatHeader;
