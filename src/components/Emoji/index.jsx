import React from 'react';

const Emoji = ({ label, symbol, onClick }) => {
  return (
    <span
      className="emoji" 
      role="img"
      aria-label={label}
      onClick={onClick}
      style={{cursor: 'pointer'}}
    >
      {symbol}
    </span>
  )
};

export default Emoji;
