import './Sidebar.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme, updateTheme } from '../../redux/slices/themeSlicer';
import { FaPlus } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { getNewChatState, triggerClearQuery, updateNewChatState } from '../../redux/slices/generalStateSlice';
import { getConversation, updateCurrentConversation } from '../../redux/slices/conversationSlice';
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";


const Sidebar = () => {
  const [isExtended, setIsExtended] = useState(true);
  const theme = useSelector(getTheme);
  const isNewChatOpen = useSelector(getNewChatState);
  const { allConversationsList, currentConversation } = useSelector(getConversation);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newTheme = theme == 'dark' ? 'light' : 'dark';
    dispatch(updateTheme(newTheme));
  }


  const toggleExpand = () => {
    setIsExtended(prevState => !prevState);
  }

  const handleNewConversation = () => {
    if (isNewChatOpen) {
      return;
    }
    const currentConversation = { id: Date.now(), title: '', conversation: [] };
    dispatch(triggerClearQuery());
    dispatch(updateCurrentConversation(currentConversation))
    dispatch(updateNewChatState(!isNewChatOpen));
  }

  const setActiveConversation = (conversation) => {
    dispatch(triggerClearQuery());
    dispatch(updateCurrentConversation(conversation));
    dispatch(updateNewChatState(false));
  }


  return (
    <div className={`sidebar-container ${isExtended ? 'sidebar-width' : 'sidebar-default-width'}`}>

      {/* Menu Icon */}
      <GiHamburgerMenu className={`menu-icon`} onClick={toggleExpand} />


      {/* New Chat */}
      <button className={`new-chat-container flex-item text-elipsis ${isExtended ? 'new-chat-width' : 'new-chat-default-width'}`} onClick={handleNewConversation}>
        <FaPlus className='plus-icon' />
        {isExtended ? 'New Chat' : ''}
      </button>



      {/* Recent Chats */}
      {
        isExtended ? <div className="recent-chat-container flex-item">
          <span className='recent-title'>Recent</span>
          <div className="conversation-list">
            {allConversationsList.map((item) => {
              return <div key={item.id} className={`conversation-item text-elipsis ${currentConversation?.id == item.id ? 'selectedConversation' : ''}`} onClick={() => setActiveConversation(item)}>
                {item.title}
              </div>
            })}
          </div>
        </div> : null
      }


      {/* Settings */}

      <div className="settings-container">

        <button onClick={toggleTheme} className={`flex-item settings-btn text-elipsis ${isExtended ? 'setting-btn-width' : 'setting-btn-min-width'}`}>
          {theme == 'dark' ? <FaMoon className='theme-icon' /> : <IoSunny className='theme-icon' />}
          Theme
        </button>
      </div>


    </div>
  )
}

export default Sidebar