import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * TypingMarkdown
 * Renders Markdown content (with GitHub-flavored markdown support) safely.
 *
 * @param {string} content - Markdown string to be rendered.
 */
const TypingMarkdown = ({ content }) => {
  return (
    <div className="markdown-container" aria-live="polite">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default TypingMarkdown;
