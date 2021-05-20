import Button from 'components/common/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitMessage } from 'redux/entities/messagesSlice';
import styles from './ChatImputs.module.css';

const ChatInputs = (props) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // Create message
    const message = {
      created: Date.now(),
      text: value,
      unread: true,
      dialogId: props.dialogId,
    };

    // Clean textarea
    setValue('');

    // Submit message
    dispatch(submitMessage(message));
  };

  return (
    <div className={styles.chatImputsWrapper}>
      <form action='' onSubmit={onSubmit}>
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
