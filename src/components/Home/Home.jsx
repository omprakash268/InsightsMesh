import React, { useEffect } from 'react';
import Welcome from './Welcome/Welcome';
import './Home.css';
import QueryInput from './QueryInput/QueryInput';
import ChatWindow from './ChatWindow/ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { getNewChatState } from '../../redux/slices/generalStateSlice';
import { fetchConversationList } from '../../utils/utils';
import { getUserName } from '../../redux/slices/userSlice';
import { setAllConversation } from '../../redux/slices/conversationSlice';

const Home = () => {
  const isNewChatOpen = useSelector(getNewChatState);
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  useEffect(() => {
    const listItem = fetchConversationList(userName);
    if (listItem?.conversationList) {
      dispatch(setAllConversation(listItem?.conversationList));
    } else {
      dispatch(setAllConversation([]));
    }
  }, [dispatch, userName]);

  return (
    <div className='home-container'>
      {isNewChatOpen ? <Welcome /> : <ChatWindow />}
      <QueryInput />
    </div>
  )
}

export default Home