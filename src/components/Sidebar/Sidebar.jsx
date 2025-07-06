import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getTheme,
  updateTheme
} from '../../redux/slices/themeSlicer';

import {
  getNewChatState,
  triggerClearQuery,
  updateNewChatState
} from '../../redux/slices/generalStateSlice';

import {
  getConversation,
  setAllConversation,
  updateCurrentConversation
} from '../../redux/slices/conversationSlice';

import { deleteConversationFromDB } from '../../utils/saveToDB';

import {
  FaPlus,
  FaMoon
} from 'react-icons/fa';
import {
  GiHamburgerMenu
} from 'react-icons/gi';
import {
  IoSunny
} from 'react-icons/io5';
import {
  MdOutlineChat,
  MdDeleteForever
} from 'react-icons/md';

import './Sidebar.css';
import { getUsername } from '../../redux/slices/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const [isExtended, setIsExtended] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [filteredConversations, setFilteredConversation] = useState([]);

  const theme = useSelector(getTheme);
  const isNewChatOpen = useSelector(getNewChatState);
  const { userName } = useSelector(getUsername);
  const { allConversationsList, currentConversation } = useSelector(getConversation);

  /** Theme toggle handler */
  const toggleTheme = () => {
    let newTheme = 'light';
    if (theme === 'light') {
      newTheme = 'dark';
    }
    dispatch(updateTheme(newTheme));
    localStorage.setItem('user-theme', newTheme);
  };

  /** Sidebar expand/collapse toggle */
  const toggleExpand = () => {
    setIsExtended(prev => !prev);
  };

  /** Filter input handler */
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  /** New chat creation handler */
  const handleNewConversation = () => {
    if (isNewChatOpen) return;

    // Skip if a blank conversation is already active
    if (
      currentConversation?.title === '' &&
      currentConversation?.conversation?.length === 0
    ) return;

    const newConversation = {
      id: Date.now(),
      createdAt: Date.now(),
      title: '',
      conversation: [],
      tag: '',
      userName,
    };

    dispatch(triggerClearQuery());
    dispatch(updateCurrentConversation(newConversation));
    dispatch(updateNewChatState(true));
  };

  /** Activate a selected conversation */
  const setActiveConversation = (conversation) => {
    dispatch(triggerClearQuery());
    dispatch(updateCurrentConversation(conversation));
    dispatch(updateNewChatState(false));
  };

  /** Delete a selected conversation */
  const deleteConversation = (item) => {
    const updatedData = allConversationsList.filter((conv) => conv.id !== item.id);
    dispatch(setAllConversation(updatedData));
    deleteConversationFromDB(item.id, item.userName);
  };

  /** Sort conversations on mount or update */
  useEffect(() => {
    const sorted = [...allConversationsList].sort((a, b) => b.createdAt - a.createdAt);
    setFilteredConversation(sorted);
  }, [allConversationsList]);

  /** Apply tag filter */
  useEffect(() => {
    const sorted = [...allConversationsList].sort((a, b) => b.createdAt - a.createdAt);

    if (!filterText.trim()) {
      setFilteredConversation(sorted);
    } else {
      const filtered = sorted.filter(conv =>
        conv?.tag?.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredConversation(filtered);
    }
  }, [filterText, allConversationsList]);

  return (
    <div className={`sidebar-container ${isExtended ? 'sidebar-width' : 'sidebar-default-width'}`}>
      {/* Sidebar toggle icon */}
      <GiHamburgerMenu className="menu-icon" onClick={toggleExpand} />

      {/* New Chat Button */}
      <button
        className={`new-chat-container flex-item text-elipsis ${isExtended ? 'new-chat-width' : 'new-chat-default-width'}`}
        onClick={handleNewConversation}
        aria-label="Start a new conversation"
      >
        <FaPlus className="plus-icon" />
        {isExtended && 'New Chat'}
      </button>

      {/* Filter Search */}
      {isExtended && (
        <div className="filter-container">
          <input
            type="text"
            id="filter-text-input"
            className="filter-input"
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Search by tag..."
            aria-label="Filter conversations"
          />
        </div>
      )}

      {/* Recent Conversations List */}
      {isExtended && (
        <div className="recent-chat-container flex-item">
          <div className="recent-title-container flex-item">
            <MdOutlineChat className="recent-chat-icon" />
            <span className="recent-title">Recent</span>
          </div>

          <div className="conversation-list">
            {filteredConversations.map((item) => (
              <div
                key={item.id}
                className={`conversation-item-wrapper flex-item ${currentConversation?.id === item.id ? 'selectedConversation' : ''}`}
                onClick={() => setActiveConversation(item)}
              >
                <div className="conversation-item text-elipsis">
                  {item.title || 'Untitled'}
                </div>

                <span className="conversation-tag">
                  {item.tag || 'No Tag'}
                </span>

                <div className="delete-wrapper flex-item">
                  <MdDeleteForever
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(item);
                    }}
                    aria-label="Delete conversation"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Theme Toggle Button */}
      <div className="settings-container">
        <button
          onClick={toggleTheme}
          className={`flex-item settings-btn text-elipsis ${isExtended ? 'setting-btn-width' : 'setting-btn-min-width'}`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <FaMoon className="theme-icon" />
          ) : (
            <IoSunny className="theme-icon" />
          )}
          {isExtended && 'Theme'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
