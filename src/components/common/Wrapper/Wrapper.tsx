import React from 'react';
import styles from './Wrapper.module.scss';
import cx from 'classnames';

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const Wrapper = ({ className, children }: WrapperProps) => {
  const classes = cx(styles.Wrapper, className);

  return <div className={classes}>{children}</div>;
};
