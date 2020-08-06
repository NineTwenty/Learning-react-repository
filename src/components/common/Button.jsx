import React from 'react';
import styles from './Button.module.css';

const Button = ({ type, children, ...rest }) => {
  return (
    <>
      <button className={styles.button} type={type} {...rest}>
        {children}
      </button>
    </>
  );
};

export default Button;
