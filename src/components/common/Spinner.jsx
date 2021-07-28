import React from 'react';
import style from './Spinner.module.css';

export const Spinner = (props) => {
  return (
    <div className={style.spinnerWrapper}>
      <div className={style.spinner}></div>
    </div>
  );
};
