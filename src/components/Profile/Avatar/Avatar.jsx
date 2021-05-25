import React from 'react';
import styles from './Avatar.module.css';

const Avatar = ({ className, avatar, name }) => {
  return (
    <div className={`${className} ${styles.Wrapper}`}>
      <img className={styles.Img} src={avatar} alt={name} />
      {/* <span className={`${styles.Status} ${styles.online}`}>1</span> */}
    </div>
  );
};

export default Avatar;
