import { Spinner } from 'common/components/Spinner';
import styles from './SplashScreen.module.css';

export function SplashScreen() {
  return (
    <div className={styles.splashScreenWrapper}>
      <div className={styles.splashScreenCentering}>
        <Spinner />
      </div>
    </div>
  );
}
