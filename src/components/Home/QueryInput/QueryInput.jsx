import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getselectedPromptState,
  getClearInputControl,
  resetClearQuery,
  updateNewChatState,
} from '../../../redux/slices/generalStateSlice';
import {
  getConversation,
  updateCurrentConversation
} from '../../../redux/slices/conversationSlice';
import { IoMdSend } from 'react-icons/io';
import runGenAI from '../../../config/gemini';
import './QueryInput.css';
import { useUpdateConversation } from '../../../hook/useUpdateConversation';
import { getUsername } from '../../../redux/slices/authSlice';

const QueryInput = () => {
  const dispatch = useDispatch();
  const selectedPrompt = useSelector(getselectedPromptState);
  const isClearInput = useSelector(getClearInputControl);
  const { currentConversation } = useSelector(getConversation);
  const { userName } = useSelector(getUsername);
  const [isLoading, setIsLoading] = useState(false);
  const updateConversationList = useUpdateConversation();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (selectedPrompt) setQuery(selectedPrompt);
  }, [selectedPrompt]);

  useEffect(() => {
    if (isClearInput) {
      setQuery('');
      dispatch(resetClearQuery());
    }
  }, [isClearInput, dispatch]);

  const handleUserQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const generateResponse = () => {
    if (!query.trim() || isLoading) return;
    setIsLoading(true);
    const timeStamp = Date.now();
    const botId = `bot-${timeStamp}`;

    const userMsg = {
      id: timeStamp,
      content: query,
      sender: 'user',
      createdAt: timeStamp
    };

    const botMsg = {
      id: botId,
      content: '',
      sender: 'bot',
      createdAt: timeStamp + 1
    };

    const baseConversation = currentConversation && Array.isArray(currentConversation.conversation)
      ? currentConversation
      : {
        id: Date.now(),
        title: query,
        conversation: [],
        tag: '',
        userName: userName,
        createdAt: Date.now()
      };

    const updatedConversation = {
      ...baseConversation,
      tag: 'Internal',
      userName: userName,
      title: baseConversation.title || query,
      conversation: [...baseConversation.conversation, userMsg, botMsg]
    };

    dispatch(updateCurrentConversation(updatedConversation));
    dispatch(updateNewChatState(false));
    geminiApiCall(botId, query, updatedConversation);
    setQuery('');
  };

  const geminiApiCall = async (botId, prompt, baseConversation) => {
    try {
      const response = await runGenAI(prompt);
      updateBotContent(botId, response, baseConversation);
    } catch (err) {
      console.error(err);
      updateBotContent(botId, 'Something went wrong !! Please try again.', baseConversation);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBotContent = (botIdToUpdate, response, baseConversation) => {
    const updatedBotConversation = {
      ...baseConversation,
      conversation: baseConversation.conversation.map((msg) =>
        msg.id === botIdToUpdate ? { ...msg, content: response } : msg
      )
    };

    dispatch(updateCurrentConversation(updatedBotConversation));
    updateConversationList(updatedBotConversation);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      generateResponse();
    }
  };

  return (
    <div className='query-input-container flex-item'>
      <div className="input-wrapper">
        <input
          type="text"
          id="user-text-input"
          className="user-input"
          value={query}
          onChange={handleUserQueryChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          aria-label="Chat input"
        />
        <button
          disabled={isLoading}
          className="circle-wrapper flex-item"
          onClick={generateResponse}
          aria-label="Send message"
        >
          <IoMdSend className='send-icon' />
        </button>
      </div>
    </div>
  );
};

export default QueryInput;
