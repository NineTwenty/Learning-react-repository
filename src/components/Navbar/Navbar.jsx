import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

export default () => {
  return (
    <nav className={s.nav}>
      <NavLink to='/dialogs' activeClassName={s.active}>Dialogs</NavLink>
      <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
      <NavLink to='/news' activeClassName={s.active}>News</NavLink>
      <NavLink to='/music' activeClassName={s.active}>Music</NavLink>
      <NavLink to="/settings" activeClassName={s.active}>Settings</NavLink>
    </nav>
  );
};
