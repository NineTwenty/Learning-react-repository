import React from 'react';
import styles from './ChatImputs.module.css';

const ChatImputs = (props) => {
  return (
    <div className={styles.chatImputsWrapper}>
      <form action=''>
        <textarea name='Message' id='' cols='20' rows='3'>
          {props.textareaMessage}
        </textarea>
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default ChatImputs;
