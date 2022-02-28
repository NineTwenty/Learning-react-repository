import { useSelector } from 'react-redux';
import { selectUserById } from 'data/entities';
import { Spinner } from 'components/common/Spinner';
import Avatar from '../../common/Avatar/Avatar';
import styles from './MessageItem.module.css';

type Props = {
  text: string;
  id: string;
  authorId: string;
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
        <span className={styles.messageItemText}>{text}</span>
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
