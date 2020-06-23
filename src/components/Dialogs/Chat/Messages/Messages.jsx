import React from 'react';

const Messages = ({children }) => {
  return (
    <div className='messagesWrapper'>
      {children}
    </div>
  );
};

export default Messages;
