import { useSelector } from 'react-redux';
import { selectUserById } from 'redux/entities';
import { Spinner } from 'components/common/Spinner';
import Avatar from '../../common/Avatar/Avatar';
import styles from './MessageItem.module.css';

const MessageItem = ({ text, id, authorId, isMine }) => {
  const wrapperClasses = `${styles.messageItemWrapper} ${
    isMine ? styles.isMine : ''
  }`;

  const author = useSelector(selectUserById(authorId));

  if (author) {
    const { avatar, username } = author;
    return (
      <div className={wrapperClasses}>
        <Avatar
          className={styles.messageItemAvatar}
          size='small'
          avatar={avatar}
          name={username}
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
};

export default MessageItem;
