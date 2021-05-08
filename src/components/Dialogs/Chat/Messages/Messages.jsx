import React, { useEffect, useState } from 'react';
import styles from './Messages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMessages,
  selectLoadedMessagesByIds,
} from 'redux/entities/messagesSlice';
import MessageItem from './MessageItem/MessageItem';

const Messages = ({ messagesIds, dialogId, userId }) => {
  const [page] = useState(1);
  const dispatch = useDispatch();

  // Fetch messages
  useEffect(() => {
    dispatch(fetchMessages(page, dialogId));
  }, [dispatch, page, dialogId]);

  // Select all currently available messages
  const messages = useSelector((state) =>
    selectLoadedMessagesByIds(state, messagesIds)
  );

  const populateMessages = (messages) =>
    messages.map(({ text, id, author }) => {
      return (
        <MessageItem
          key={id}
          id={id}
          text={text}
          authorId={author}
          positionLeft={userId === author}
        />
      );
    });

  return (
    <div className={styles.messagesWrapper}>
      {messages ? populateMessages(messages) : null}
    </div>
  );
};

export default Messages;
