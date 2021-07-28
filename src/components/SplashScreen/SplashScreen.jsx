import React from 'react';
import styles from './SplashScreen.module.css';
import { Spinner } from '../common/Spinner';

export const SplashScreen = (props) => {
  return (
    <div className={styles.splashScreenWrapper}>
      <div className={styles.splashScreenCentering}>
        <Spinner />
      </div>
    </div>
  );
};
