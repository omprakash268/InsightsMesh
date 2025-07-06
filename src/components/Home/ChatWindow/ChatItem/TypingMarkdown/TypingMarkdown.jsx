import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TypingMarkdown = ({ content }) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 15; // characters per interval

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + content[index]);
      index++;
      if (index >= content.length) clearInterval(interval);
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [content]);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {displayedText}
    </ReactMarkdown>
  );
};

export default TypingMarkdown;
