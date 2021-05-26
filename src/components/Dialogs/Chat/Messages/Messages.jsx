import React, { useEffect, useRef, useState } from 'react';
import styles from './Messages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMessages,
  selectLoadedMessagesByIds,
} from 'redux/entities/messagesSlice';
import MessageItem from './MessageItem/MessageItem';
import { selectDialogById } from 'redux/entities';

const Messages = ({ dialogId, userId }) => {
  const scrollAnchorRef = useRef();
  const [isScrolledByUser, setIsScrolledByUser] = useState(false);
  const [page] = useState(1);
  const dispatch = useDispatch();

  // Fetch messages
  useEffect(() => {
    dispatch(fetchMessages(page, dialogId));
  }, [dispatch, page, dialogId]);

  // Select dialog's messagesIds
  const { messages: messagesIds } = useSelector(selectDialogById(dialogId));

  // Select all currently available messages
  const messages = useSelector((state) =>
    selectLoadedMessagesByIds(state, messagesIds)
  );

  // Autoscroll to last message
  useEffect(() => {
    // Don't scroll if user has scrolled up to see previous messages
    if (!isScrolledByUser) {
      scrollAnchorRef.current.scrollIntoView();
    }
  });

  // Setup IntersectionObserver for user scroll detection
  useEffect(() => {
    const options = {
      root: scrollAnchorRef.current.parentElement,
    };

    const observer = new IntersectionObserver((entries) => {
      // Use intersection value as scrolling state
      setIsScrolledByUser(!entries[0].isIntersecting);
    }, options);

    // Use empty div under messages as target
    observer.observe(scrollAnchorRef.current);

    return () => observer.disconnect();
  }, []);

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
      <div ref={scrollAnchorRef} className={styles.scrollAnchor}></div>
    </div>
  );
};

export default Messages;
