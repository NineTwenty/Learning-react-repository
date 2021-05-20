import Button from 'components/common/Button';
import React from 'react';
import styles from './ChatImputs.module.css';

const ChatInputs = (props) => {
  return (
    <div className={styles.chatImputsWrapper}>
      <form action=''>
        <textarea name='Message' id='' cols='20' rows='3' />
        <Button type='submit'>Send</Button>
      </form>
    </div>
  );
};

export default ChatInputs;
