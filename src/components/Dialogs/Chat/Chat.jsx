import React from 'react';
import styles from './Chat.module.css';
import ChatHeader from './ChatHeader/ChatHeader';
import Messages from './Messages/Messages';
import ChatImputs from './ChatInputs/ChatInputs';
import { useParams } from 'react-router-dom';

export default (props) => {
  const { id } = useParams();

  const selectedDialog = props.dialogs.filter((user) => user.id === +id)[0];

  return (
    <div className={styles.chatWrapper}>
      <ChatHeader />
      <Messages dialog={selectedDialog} />
      <ChatImputs />
    </div>
  );
};
