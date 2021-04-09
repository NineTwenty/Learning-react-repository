import React from 'react';
import styles from './Header.module.css';
import { HamburgerButton } from './HamburgerButton';

const Header = ({ isSideNavForceOpen, setSideNavForceOpen, menuBtnRef }) => {
  return (
    <header className={styles.header}>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbqUkyAK84IcDm7zcaea_O8vPEYDDhEyZ-DR5wV_oqccAu65Zd&usqp=CAU'
        alt='logo'
      ></img>
      <HamburgerButton
        menuBtnRef={menuBtnRef}
        isSideNavForceOpen={isSideNavForceOpen}
        setSideNavForceOpen={setSideNavForceOpen}
      />
    </header>
  );
};

export default Header;
