import React from 'react';
import cx from 'classnames';
import styles from './Wrapper.module.scss';

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function Wrapper({ className, children }: WrapperProps) {
  const classes = cx(styles.Wrapper, className);

  return <div className={classes}>{children}</div>;
}
