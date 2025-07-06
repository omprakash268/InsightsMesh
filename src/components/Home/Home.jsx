import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Welcome from './Welcome/Welcome';
import ChatWindow from './ChatWindow/ChatWindow';
import QueryInput from './QueryInput/QueryInput';

import './Home.css';

import { getNewChatState } from '../../redux/slices/generalStateSlice';
import { getUserName } from '../../redux/slices/userSlice';
import { setAllConversation } from '../../redux/slices/conversationSlice';

import { fetchConversationList } from '../../utils/utils';

const Home = () => {
  const dispatch = useDispatch();
  const isNewChatOpen = useSelector(getNewChatState);
  const userName = useSelector(getUserName);

  // Load conversation list from local storage on mount
  useEffect(() => {
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
