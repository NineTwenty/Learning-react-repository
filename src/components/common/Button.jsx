import React from 'react';
import styles from './Button.module.scss';
import cx from 'classnames';

const Button = ({ className, type, styleType, children, ...rest }, ref) => {
  const classes = cx(styles.button, className, {
    [styles.button_default]: styleType === undefined,
    [styles.button_light]: styleType === 'light',
    [styles.button_borderless]: styleType === 'borderless',
  });

  return (
    <>
      <button className={classes} type={type} ref={ref} {...rest}>
        {children}
      </button>
    </>
  );
};

export default React.forwardRef(Button);
