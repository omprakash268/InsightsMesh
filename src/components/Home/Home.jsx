import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Welcome from './Welcome/Welcome';
import ChatWindow from './ChatWindow/ChatWindow';
import QueryInput from './QueryInput/QueryInput';

import './Home.css';

import { getNewChatState } from '../../redux/slices/generalStateSlice';
import { setAllConversation } from '../../redux/slices/conversationSlice';

import { fetchConversationList } from '../../utils/utils';
import { getUsername } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const isNewChatOpen = useSelector(getNewChatState);
  const { userName } = useSelector(getUsername);
  const navigate = useNavigate();


  // Load conversation list from local storage on mount
  useEffect(() => {
    if (!userName) {
      navigate('/login');
    }
    const listItem = fetchConversationList(userName);
    const userConversations = listItem?.conversationList || [];
    dispatch(setAllConversation(userConversations));
  }, [dispatch, userName]);

  return (
    <div className='home-container'>
      {/* Show welcome screen on new chat, otherwise show chat window */}
      {isNewChatOpen ? <Welcome /> : <ChatWindow />}

      {/* Query input bar is persistent */}
      <QueryInput />
    </div>
  );
};

export default Home;
