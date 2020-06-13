import React from 'react';
import MessageItem from './MessageItem/MessageItem';

const Messages = ({ dialog: { name, avatar, messages } }) => {
  return (
    <div className='messagesWrapper'>
      {messages.map(({ text, id }) => {
        return (
          <MessageItem avatar={avatar} username={name} text={text} key={id} />
        );
      })}
    </div>
  );
};

export default Messages;
