import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import './QuickPromptCard.css';
import { updateSelectedPromptState } from '../../../../redux/slices/generalStateSlice';

const QuickPromptCard = ({ prompt }) => {
  const dispatch = useDispatch();

  // Handler to set the selected prompt content
  const setSelectedPrompt = useCallback(() => {
    dispatch(updateSelectedPromptState(`${prompt.content} ${prompt.subText}`));
  }, [dispatch, prompt]);

  // Allow keyboard accessibility (Enter key support)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSelectedPrompt();
    }
  };

  return (
    <div
      className='prompt-card'
      onClick={setSelectedPrompt}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
      aria-label={`Use prompt: ${prompt.content}`}
    >
      <p className='prompt-content'>{prompt.content}</p>
      <span className='sub-text'>{prompt.subText}</span>
    </div>
  );
};

export default QuickPromptCard;
