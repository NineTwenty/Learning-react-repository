import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'common/hooks/hooks';
import {
  clearMessages,
  selectDialogById,
  fetchMessages,
  selectLoadedMessagesByIds,
} from 'data/entities';
import InfiniteScrollReverse from 'common/components/InfiniteScrollReverse/InfiniteScrollReverse';
import type { Dialog, Message, User } from 'common/entities.types';
import MessageItem from '../MessageItem/MessageItem';
import styles from './ChatBox.module.css';

type Props = {
  dialogId: Dialog['id'];
  userId: User['id'];
};

function ChatBox({ dialogId, userId }: Props) {
  const dispatch = useDispatch();

  // Clear messages on dialog or page change
  useEffect(() => {
    dispatch(clearMessages());
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch, dialogId]);

  const populateMessages = (messages: Message[]) =>
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

  const { messages: messagesIds } = useAppSelector(
    selectDialogById(dialogId)
  ) || { messages: [] };

  // Select all currently available messages
  const messages = useAppSelector((state) =>
    selectLoadedMessagesByIds(state, messagesIds)
  );

  const loadMore = useCallback(
    (page: number) => {
      dispatch(fetchMessages(page, dialogId));
    },
    [dispatch, dialogId]
  );

  const hasMore =
    messages && messagesIds ? messagesIds.length > messages.length : false;

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
}

export default React.memo(ChatBox);
