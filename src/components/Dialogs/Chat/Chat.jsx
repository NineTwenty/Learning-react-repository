import React from 'react';
import styles from './Chat.module.css';
import ChatHeader from './ChatHeader/ChatHeader';
import Messages from './Messages/Messages';
import ChatInputs from './ChatInputs/ChatInputs';
import { useParams } from 'react-router-dom';

const Chat = ({ dialogs, textareaState, dispatch }) => {
  const { id } = useParams();

  const selectedDialog = dialogs.filter((user) => user.id === +id)[0];

  return (
    <div className={styles.chatWrapper}>
      <ChatHeader />
      <Messages dialog={selectedDialog} />
      <ChatInputs dispatch={dispatch} textareaState={textareaState} />
    </div>
  );
};

export default Chat;
