import Avatar from 'components/common/Avatar/Avatar';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ member }) => {
  const { avatar, firstName, lastName } = member;
  const fullname = `${firstName} ${lastName}`;

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ButtonBox} />
      <h4 className={styles.MemberName}>{fullname}</h4>
      <Avatar size='small' {...{ avatar, name: fullname }} />
    </div>
  );
};

export default ChatHeader;
