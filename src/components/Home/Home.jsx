import React from 'react';
import Welcome from './Welcome/Welcome';
import './Home.css';
import QueryInput from './QueryInput/QueryInput';
import ChatWindow from './ChatWindow/ChatWindow';
import { useSelector } from 'react-redux';
import { getNewChatState } from '../../redux/slices/generalStateSlice';

const Home = () => {
  const isNewChatOpen = useSelector(getNewChatState);
  return (
    <div className='home-container'>
      {isNewChatOpen ? <Welcome /> : <ChatWindow />}
      <QueryInput />
    </div>
  )
}

export default Home