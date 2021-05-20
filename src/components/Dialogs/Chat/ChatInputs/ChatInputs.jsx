import Button from 'components/common/Button';
import React, { useState } from 'react';
import styles from './ChatImputs.module.css';

const ChatInputs = (props) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.chatImputsWrapper}>
      <form action=''>
        <textarea
          onChange={onChange}
          value={value}
          name='message'
          id=''
          cols='20'
          rows='3'
        />
        <Button type='submit'>Send</Button>
      </form>
    </div>
  );
};

export default ChatInputs;
