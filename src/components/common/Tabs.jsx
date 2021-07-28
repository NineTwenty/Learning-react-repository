import React from 'react';
import style from './Tabs.module.css';

export const Tabs = ({ children }) => {
  return <div className={style.tabs}>{children}</div>;
};
