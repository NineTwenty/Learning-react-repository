import React from 'react';
import style from './HamburgerButton.module.css';

export const HamburgerButton = ({
  isSideNavForceOpen,
  setSideNavForceOpen,
  menuBtnRef,
}) => {
  const isActive = isSideNavForceOpen ? style.isActive : '';

  // Toggle open/close sideNav flag
  const onClick = () => setSideNavForceOpen(!isSideNavForceOpen);

  return (
    <button
      ref={menuBtnRef}
      onClick={onClick}
      className={`${style.hamButton} ${isActive}`}
    >
      <span aria-hidden='true'>☰</span> Menu
    </button>
  );
};
