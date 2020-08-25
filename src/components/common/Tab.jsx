import React from 'react';
import style from './Tab.module.css';
import { NavLink, useRouteMatch } from 'react-router-dom';

export const Tab = ({ value, route }) => {
  const { url } = useRouteMatch();
  // Always will be active if route was unprovided
  const validRoute = route ? `${url}/${route}` : `${url}`;

  return (
    <NavLink
      to={validRoute}
      className={style.link}
      activeClassName={style.active}
    >
      {value}
    </NavLink>
  );
};
