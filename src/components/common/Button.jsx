import React from 'react';
import styles from './Button.module.scss';

const Button = ({ className, type, children, ...rest }, ref) => {
  return (
    <>
      <button
        className={`${styles.button} ${className}`}
        type={type}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default React.forwardRef(Button);
