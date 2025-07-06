import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ChatHeader.css';
import { getConversation, updateCurrentConversation } from '../../../../redux/slices/conversationSlice';
import { FaDownload } from "react-icons/fa6";
import { useState } from 'react';
import { useUpdateConversation } from '../../../../hook/useUpdateConversation';
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const ChatHeader = () => {
    const { currentConversation } = useSelector(getConversation);
    const [selectedTag, setSelectedTag] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const tags = ['Support', 'Sales', 'Internal'];
    const dispatch = useDispatch();
    const updateConversationList = useUpdateConversation();

    const handleChange = (e) => {
        const value = e.target.value;
        if (currentConversation.tag === value) return;
        setSelectedTag(value);
        const updatedData = { ...currentConversation, tag: value };
        dispatch(updateCurrentConversation(updatedData));
        updateConversationList(updatedData);
    };

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

    const renameTitle = () => {
        setIsEditing(true);
    }

    const onTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
    }

    const updateTitle = () => {
        const updatedData = { ...currentConversation, title: title };
        dispatch(updateCurrentConversation(updatedData));
        updateConversationList(updatedData);
        setIsEditing(false);
    }

    useEffect(() => {
        if (currentConversation?.tag !== selectedTag) {
            setSelectedTag(currentConversation?.tag || '');
        }
        setTitle(currentConversation.title);
    }, [currentConversation, selectedTag]);

    return (
        <div className='chat-header-container flex-item'>
            <div className="title-wrapper flex-item">
                {
                    isEditing ?
                        <>
                            <input id='title-input-1' className='title-input' type="text" value={title} onChange={onTitleChange} />
                            <FaCheckCircle className='tick-icon' onClick={updateTitle} /></>
                        :
                        <>
                            <div className='title text-elipsis flex-item' title={currentConversation?.title}>{currentConversation?.title} <FaEdit className='edit-icon' onClick={renameTitle} /></div>
                        </>
                }

            </div>
            <div className="tag-container flex-item">
                <div className="dropdown-wrapper">
                    <select
                        value={selectedTag}
                        onChange={handleChange}
                        className={`dropdown-select ${selectedTag.toLowerCase()}`}
                    >
                        <option value="" disabled>Select a tag</option>
                        {tags.map(tag => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>
                <FaDownload className='download-file' onClick={handleDownloadJson} />
            </div>
        </div>
    )
}

export default ChatHeader