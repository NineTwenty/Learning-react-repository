import React from 'react';
import styles from './Avatar.module.css';

const Avatar = (props) => {
  return (
    <div className={`${props.className} ${styles.avatarWrapper}`}>
      <img className={styles.avatarImg} src={props.avatar} alt={props.name} />
      {/* <span className={`${styles.avatarStatus} ${styles.online}`}>1</span> */}
    </div>
  );
};

export default Avatar;