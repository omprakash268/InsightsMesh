import './QueryInput.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getselectedPromptState,
  getClearInputControl,
  resetClearQuery,
  updateNewChatState
} from '../../../redux/slices/generalStateSlice';
import { useState, useEffect } from 'react';
import {
  getConversation,
  updateCurrentConversation
} from '../../../redux/slices/conversationSlice';
import { IoMdSend } from "react-icons/io";

const QueryInput = () => {
  const dispatch = useDispatch();
  const selectedPrompt = useSelector(getselectedPromptState);
  const isClearInput = useSelector(getClearInputControl);
  let { currentConversation } = useSelector(getConversation);

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
    if (!query.trim()) return;
    // Make sure currentConversation exists
    if (!currentConversation || !Array.isArray(currentConversation.conversation)) {
      currentConversation = { id: Date.now(), title: query, conversation: [] };
    }

    const timeStamp = Date.now();

    const user = {
      id: timeStamp,
      content: query,
      sender: 'user',
      createdAt: timeStamp
    };

    const bot = {
      id: timeStamp + 1,
      content: 'Service is unavailable.',
      sender: 'bot',
      createdAt: timeStamp + 1
    };



    const updatedConversation = {
      ...currentConversation,
      conversation: [
        ...currentConversation.conversation,
        user,
        bot
      ]
    };

    if (updatedConversation.title.length == 0) {
      updatedConversation.title = query;
    }

    dispatch(updateCurrentConversation(updatedConversation));
    dispatch(updateNewChatState(false));
    setQuery(''); // clear locally
  };

  return (
    <div className='query-input-container flex-item'>
      <div className="input-wrapper">
        <input
          type="text"
          className='user-input'
          onChange={handleUserQueryChange}
          value={query}
          placeholder="Type your message here..."
        />
        <button className="circle-wrapper flex-item" onClick={generateResponse}>
          <IoMdSend className='send-icon' />
        </button>
      </div>
    </div>
  );
};

export default QueryInput;
