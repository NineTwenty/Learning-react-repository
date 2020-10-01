import React from 'react';
import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

export default ({ isSideNavForceOpen }) => {
  const isOpen = isSideNavForceOpen ? style.isOpen : '';

  return (
    <nav className={`${style.nav} ${isOpen}`}>
      <NavLink
        to='/dialogs'
        className={style.navLink}
        activeClassName={style.active}
      >
        Dialogs
      </NavLink>
      <NavLink
        to='/profile'
        className={style.navLink}
        activeClassName={style.active}
      >
        Profile
      </NavLink>
      <NavLink
        to='/news'
        className={style.navLink}
        activeClassName={style.active}
      >
        News
      </NavLink>
      <NavLink
        to='/music'
        className={style.navLink}
        activeClassName={style.active}
      >
        Music
      </NavLink>
      <NavLink
        to='/settings'
        className={style.navLink}
        activeClassName={style.active}
      >
        Settings
      </NavLink>
    </nav>
  );
};
