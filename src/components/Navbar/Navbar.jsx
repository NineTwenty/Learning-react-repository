import React, { useEffect } from 'react';
import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

export const Navbar = ({
  isSideNavForceOpen,
  setSideNavForceOpen,
  menuBtnRef,
}) => {
  const isOpen = isSideNavForceOpen ? style.isOpen : '';

  // Close on click outside navbar
  useEffect(() => {
    const menuBtn = menuBtnRef.current;
    const menuBtnChild = menuBtn.firstElementChild;

    // Check if value is match any navbar's css class
    const isInStyles = (btnClass) =>
      Object.values(style).some((className) => className === btnClass);

    // Click event handler
    const closeOnOutsideClick = ({ target }) => {
      // Check if it's not the toggle button
      if (target !== menuBtn || target !== menuBtnChild) {
        // Take first class
        const mainClass = target.classList[0];

        // Check if navbar is open & target is part of navbar
        if (isSideNavForceOpen && !isInStyles(mainClass)) {
          // Close navbar
          setSideNavForceOpen(false);
        }
      }
    };

    window.addEventListener('click', closeOnOutsideClick);

    return () => window.removeEventListener('click', closeOnOutsideClick);
  }, [isSideNavForceOpen, setSideNavForceOpen, menuBtnRef]);

  // Render
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
