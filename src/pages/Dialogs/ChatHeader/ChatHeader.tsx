import { User } from 'common/entities.types';
import Avatar from 'common/components/Avatar/Avatar';
import styles from './ChatHeader.module.css';

type Props = {
  member: Pick<User, 'avatar' | 'firstName' | 'lastName'>;
};

function ChatHeader({ member }: Props) {
  const { avatar, firstName, lastName } = member;
  const fullname = `${firstName} ${lastName}`;

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ButtonBox} />
      <h4 className={styles.MemberName}>{fullname}</h4>
      <Avatar size='small' {...{ avatar, name: fullname }} />
    </div>
  );
}

export default ChatHeader;
