import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  styleType?: 'default' | 'light' | 'borderless';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      type = 'button',
      styleType = 'default',
      onClick,
    }: ButtonProps,
    ref
  ) => {
    const classes = cx(styles.button, className, {
      [styles.button_default]: styleType === 'default',
      [styles.button_light]: styleType === 'light',
      [styles.button_borderless]: styleType === 'borderless',
    });

    return (
      <>
        {/* eslint-disable-next-line react/button-has-type */}
        <button className={classes} type={type} ref={ref} onClick={onClick}>
          {children}
        </button>
      </>
    );
  }
);

export default Button;
