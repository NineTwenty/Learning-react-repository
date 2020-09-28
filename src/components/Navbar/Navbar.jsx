import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

export default () => {
  return (
    <nav className={s.nav}>
      <NavLink to='/dialogs' className={s.navLink} activeClassName={s.active}>
        Dialogs
      </NavLink>
      <NavLink to='/profile' className={s.navLink} activeClassName={s.active}>
        Profile
      </NavLink>
      <NavLink to='/news' className={s.navLink} activeClassName={s.active}>
        News
      </NavLink>
      <NavLink to='/music' className={s.navLink} activeClassName={s.active}>
        Music
      </NavLink>
      <NavLink to='/settings' className={s.navLink} activeClassName={s.active}>
        Settings
      </NavLink>
    </nav>
  );
};
