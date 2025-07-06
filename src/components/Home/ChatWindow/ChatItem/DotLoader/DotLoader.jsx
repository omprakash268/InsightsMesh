import React from 'react';
import './DotLoader.css';

/**
 * DotLoader component shows a three-dot typing animation.
 * Typically used to indicate an assistant or bot is generating a response.
 */
const DotLoader = () => {
  return (
    <div
      className="dot-typing"
      role="status"
      aria-label="Assistant is typing"
    >
      <span></span> {/* Center dot; ::before and ::after are handled in CSS */}
    </div>
  );
};

export default DotLoader;