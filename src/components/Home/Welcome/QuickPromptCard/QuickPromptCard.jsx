import React from 'react';
import { useDispatch } from 'react-redux';
import './QuickPromptCard.css';
import { updateSelectedPromptState } from '../../../../redux/slices/generalStateSlice';

const QuickPromptCard = ({ prompt }) => {
    const dispatch = useDispatch();

    const setSelectedPrompt = () =>{
        dispatch(updateSelectedPromptState(prompt.content + prompt.subText));
    }
    return (
        <div className='prompt-card' onClick={setSelectedPrompt}>
            <p className='prompt-content'>{prompt.content}</p>
            <span className='sub-text'>{prompt.subText}</span>
        </div>
    )
}

export default QuickPromptCard