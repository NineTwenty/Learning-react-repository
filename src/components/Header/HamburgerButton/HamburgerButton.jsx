import React from 'react';
import style from './HamburgerButton.module.css';

export const HamburgerButton = ({ isSideNavForceOpen, setSideNavForceOpen }) => {
  const isActive = isSideNavForceOpen ? style.isActive : '';
  
  // Toggle open/close sideNav flag
  const onClick = () => setSideNavForceOpen(!isSideNavForceOpen);

  return (
    <button onClick={onClick} className={`${style.hamButton} ${isActive}`} >
      <span aria-hidden='true'>☰</span> Menu
    </button>
  );
};
