import React from 'react';
import styles from './Chat.module.css';
import ChatHeader from './ChatHeader/ChatHeader';
import Messages from './Messages/Messages';
import ChatInputs from './ChatInputs/ChatInputs';
import { useSelector } from 'react-redux';
import { selectDialogMemberId, selectUserById } from 'redux/entities';

const Chat = ({
  className,
  dialogId,
  userId,
  dialogsControlBtn,
  isDialogsListOpen,
}) => {
  const memberId = useSelector(selectDialogMemberId(dialogId));
  const member = useSelector(selectUserById(memberId));

  const isLoaded = member;

  const classes = className
    ? `${className} ${styles.chatWrapper}`
    : styles.chatWrapper;

  // Capitalize for jsx
  const DialogsControlBtn = dialogsControlBtn;

  return (
    <div className={classes}>
      {isLoaded && (
        <>
          <ChatHeader member={member}>
            {
              // Show toggle here only if list is closed
              // and there's no other visible button
              !isDialogsListOpen && <DialogsControlBtn />
            }
          </ChatHeader>
          <Messages {...{ dialogId, userId }} />
          <ChatInputs dialogId={dialogId} />
        </>
      )}
    </div>
  );
};

export default Chat;
