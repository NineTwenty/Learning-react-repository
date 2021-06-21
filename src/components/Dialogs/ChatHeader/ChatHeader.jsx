import Avatar from 'components/common/Avatar/Avatar';
import React from 'react';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ children, member }) => {
  const { avatar, firstName, lastName } = member;
  const fullname = `${firstName} ${lastName}`;

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ButtonBox}>{children}</div>
      <h4 className={styles.MemberName}>{fullname}</h4>
      <Avatar {...{ avatar, name: fullname }} />
    </div>
  );
};

export default ChatHeader;
