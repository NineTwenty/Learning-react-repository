import React from 'react';
import style from './Tab.module.css';
import { NavLink } from 'react-router-dom';

export const Tab = ({ value, route }) => {
  return (
    <NavLink to={route} className={style.link} activeClassName={style.active}>
      {value}
    </NavLink>
  );
};
