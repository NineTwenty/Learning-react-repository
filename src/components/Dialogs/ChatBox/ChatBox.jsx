import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearMessages,
  selectDialogById,
  fetchMessages,
  selectLoadedMessagesByIds,
} from 'redux/entities';
import InfiniteScrollReverse from 'components/common/InfiniteScrollReverse/InfiniteScrollReverse';
import MessageItem from '../MessageItem/MessageItem';
import styles from './ChatBox.module.css';

const ChatBox = ({ dialogId, userId }) => {
  const dispatch = useDispatch();

  // Clear messages on dialog or page change
  useEffect(() => {
    dispatch(clearMessages());
    return () => dispatch(clearMessages());
  }, [dispatch, dialogId]);

  const populateMessages = (messages) =>
    messages.map(({ text, id, author }) => {
      return (
        <MessageItem
          key={id}
          id={id}
          text={text}
          authorId={author}
          isMine={userId === author}
        />
      );
    });

  const { messages: messagesIds } =
    useSelector(selectDialogById(dialogId)) || {};

  // Select all currently available messages
  const messages = useSelector((state) =>
    selectLoadedMessagesByIds(state, messagesIds)
  );

  const loadMore = useCallback(
    (page) => {
      dispatch(fetchMessages(page, dialogId));
    },
    [dispatch, dialogId]
  );

  const hasMore = messages ? messagesIds.length > messages.length : false;

  return (
    <div className={styles.ChatBox}>
      <InfiniteScrollReverse
        hasMore={hasMore}
        loadMore={loadMore}
        key={dialogId}
      >
        {messages ? populateMessages(messages) : null}
      </InfiniteScrollReverse>
    </div>
  );
};

export default React.memo(ChatBox);
