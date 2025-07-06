import React from 'react'
import './Welcome.css';
import QuickPromptCard from './QuickPromptCard/QuickPromptCard';
import { getQuickPromptList } from '../../../utils/utils';

const Welcome = () => {
  const prompts = getQuickPromptList();
  return (
    <div className='welcome-container flex-item'>
      <h1 className="welocome-text-gradient">Welcome to InsightMesh</h1>
      <div className="quick-prompts-card">
        {
          prompts.map((p) => {
            return <QuickPromptCard key={p.id} prompt={p} />
          })
        }

      </div>

    </div>
  )
}

export default Welcome