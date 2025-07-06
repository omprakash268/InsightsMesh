import { useDispatch, useSelector } from 'react-redux';
import { setAllConversation } from '../redux/slices/conversationSlice';
import { saveToDB } from '../utils/saveToDB';

/**
 * Custom hook to update the Redux conversation list and persist to local storage.
 * Returns a function to call with updated conversation data.
 */
export const useUpdateConversation = () => {
  const dispatch = useDispatch();

  const allConversationsList = useSelector(state => state.conversation.allConversationsList);
  const currentConversation = useSelector(state => state.conversation.currentConversation);

  const updateConversationList = (updatedConversation) => {
    if (!updatedConversation || !updatedConversation.id) return;

    // Safe clone of the existing conversation list
    const updatedList = structuredClone?.(allConversationsList) || [...allConversationsList.map(c => ({ ...c }))];

    // Find existing conversation index
    const index = updatedList.findIndex(conv => conv.id === currentConversation?.id);

    if (index !== -1) {
      updatedList[index] = updatedConversation;
    } else {
      updatedList.push(updatedConversation);
    }

    // Update Redux store
    dispatch(setAllConversation(updatedList));

    // Persist to local storage
    saveToDB(updatedConversation, updatedConversation.userName);
  };

  return updateConversationList;
};
