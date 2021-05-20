import React from 'react';
import styles from './ChatImputs.module.css';

const ChatInputs = (props) => {
  return (
    <div className={styles.chatImputsWrapper}>
      <textarea
        name='Message'
        id=''
        cols='20'
        rows='3'
      />
    </div>
  );
};

export default ChatInputs;
