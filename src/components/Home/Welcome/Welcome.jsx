import React from 'react';
import './Welcome.css';
import QuickPromptCard from './QuickPromptCard/QuickPromptCard';
import { getQuickPromptList } from '../../../utils/utils';

const Welcome = () => {
  const prompts = getQuickPromptList();

  return (
    <div className='welcome-container flex-item'>
      {/* Animated gradient heading */}
      <h1 className='welcome-text-gradient'>Welcome to InsightMesh</h1>

      {/* Quick prompt cards grid */}
      <div className='quick-prompts-card'>
        {prompts.map((prompt) => (
          <QuickPromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};

export default Welcome;
