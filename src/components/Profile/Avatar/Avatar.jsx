import React from 'react';
import styles from './Avatar.module.css';

const Avatar = (props) => {
  return (
    <div className={`${props.className} ${styles.Wrapper}`}>
      <img className={styles.Img} src={props.avatar} alt={props.name} />
      {/* <span className={`${styles.Status} ${styles.online}`}>1</span> */}
    </div>
  );
};

export default Avatar;