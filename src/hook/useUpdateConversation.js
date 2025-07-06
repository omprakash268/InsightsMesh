import { useDispatch, useSelector } from 'react-redux';
import { setAllConversation } from '../redux/slices/conversationSlice';
import { saveToDB } from '../utils/saveToDB';



export const useUpdateConversation = () => {
  const dispatch = useDispatch();
  const allConversationsList = useSelector(state => state.conversation.allConversationsList);
  const currentConversation = useSelector(state => state.conversation.currentConversation);

  const updateConversationList = (updatedBotConversation) => {
    const updatedAllConversation = JSON.parse(JSON.stringify(allConversationsList));
    const index = updatedAllConversation.findIndex(conv => conv.id === currentConversation.id);

    if (index !== -1) {
      updatedAllConversation[index] = updatedBotConversation;
    } else {
      updatedAllConversation.push(updatedBotConversation);
    }

    dispatch(setAllConversation(updatedAllConversation));
    saveToDB(updatedBotConversation, updatedBotConversation.userName);
  };

  return updateConversationList;
};
