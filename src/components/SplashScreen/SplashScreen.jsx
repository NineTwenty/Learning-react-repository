import styles from './SplashScreen.module.css';
import { Spinner } from '../common/Spinner';

export function SplashScreen() {
  return (
    <div className={styles.splashScreenWrapper}>
      <div className={styles.splashScreenCentering}>
        <Spinner />
      </div>
    </div>
  );
}
