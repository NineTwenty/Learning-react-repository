import React from 'react';
import MessageItem from './MessageItem/MessageItem';

const Messages = (props) => {
  const name = props.dialog.name;
  const avatar = props.dialog.avatar;

  return (
    <div className='messagesWrapper'>
      {props.dialog.messages.map((message) => {
        return (
          <MessageItem
            avatar={avatar}
            username={name}
            text={message.text}
            key={message.id}
          />
        );
      })}
    </div>
  );
};

export default Messages;
