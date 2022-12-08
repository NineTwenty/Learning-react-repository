import { useSelector } from 'react-redux';
import { selectUserById } from 'data/entities';
import Spinner from 'common/components/Spinner';
import Avatar from 'common/components/Avatar/Avatar';
import type { Message, User } from 'utils/prismaUtils';
import styles from './MessageItem.module.css';

type Props = {
  text: string;
  id: Message['id'];
  authorId: User['id'];
  isMine: boolean;
};

function MessageItem({ text, id, authorId, isMine }: Props) {
  const wrapperClasses = `${styles.messageItemWrapper} ${
    isMine ? styles.isMine : ''
  }`;

  const author = useSelector(selectUserById(authorId));

  if (author) {
    const { avatar, fullName } = author;
    return (
      <div className={wrapperClasses}>
        <Avatar
          className={styles.messageItemAvatar}
          size='small'
          avatar={avatar}
          name={fullName}
          key={id}
        />
        <p className={styles.messageItemText}>{text}</p>
      </div>
    );
  }
  return (
    <div className={styles.messageItemWrapper}>
      <Spinner />
    </div>
  );
}

export default MessageItem;
