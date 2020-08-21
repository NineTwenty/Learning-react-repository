import React from 'react';
import styles from './Header.module.css';

const Header = ({ user, authenticateUser }) => {
  return (
    <header className={styles.header}>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbqUkyAK84IcDm7zcaea_O8vPEYDDhEyZ-DR5wV_oqccAu65Zd&usqp=CAU'
        alt='logo'
      ></img>
    </header>
  );
};

export default Header;
