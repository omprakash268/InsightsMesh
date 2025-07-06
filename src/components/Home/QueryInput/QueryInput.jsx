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
  setAllConversation,
  updateCurrentConversation
} from '../../../redux/slices/conversationSlice';
import { getUserName } from '../../../redux/slices/userSlice';
import { IoMdSend } from 'react-icons/io';
import runGenAI from '../../../config/gemini';
import './QueryInput.css';
import { saveToDB } from '../../../utils/utils';

const QueryInput = () => {
  const dispatch = useDispatch();
  const selectedPrompt = useSelector(getselectedPromptState);
  const isClearInput = useSelector(getClearInputControl);
  const { allConversationsList, currentConversation } = useSelector(getConversation);
  const userName = useSelector(getUserName);
  const [isLoading, setIsLoading] = useState(false);

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
        userName: userName
      };

    const updatedConversation = {
      ...baseConversation,
      tag: 'Internal',
      userName: userName,
      title: baseConversation.title || query,
      conversation: [...baseConversation.conversation, userMsg, botMsg]
    };

    dispatch(updateCurrentConversation(updatedConversation));
    saveToDB(updatedConversation, userName);
    dispatch(updateNewChatState(false));
    setQuery('');

    geminiApiCall(botId, query, updatedConversation, userName);
  };

  const geminiApiCall = async (botId, prompt, baseConversation, userName) => {
    try {
      const response = await runGenAI(prompt);
      updateBotContent(botId, response, baseConversation, userName);
    } catch (err) {
      console.error(err);
      updateBotContent(botId, 'Something went wrong !! Please try again.', baseConversation);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBotContent = (botIdToUpdate, response, baseConversation, userName) => {
    const updatedBotConversation = {
      ...baseConversation,
      conversation: baseConversation.conversation.map((msg) =>
        msg.id === botIdToUpdate ? { ...msg, content: response } : msg
      )
    };

    const updatedAllConversation = JSON.parse(JSON.stringify(allConversationsList));

    const index = updatedAllConversation.findIndex(conv => conv.id === currentConversation.id);
    if (index !== -1) {
      updatedAllConversation[index] = updatedBotConversation;
    } else {
      updatedAllConversation.push(updatedBotConversation);
    }

    dispatch(setAllConversation(updatedAllConversation));
    dispatch(updateCurrentConversation(updatedBotConversation));
    saveToDB(updatedBotConversation, userName);
  };


  return (
    <div className='query-input-container flex-item'>
      <div className="input-wrapper">
        <input
          type="text"
          id='user-text-input'
          className='user-input'
          value={query}
          onChange={handleUserQueryChange}
          onKeyDown={(e) => e.key === 'Enter' && generateResponse()}
          placeholder="Type your message here..."
          aria-label="Chat input"
        />
        <button
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
