import styles from './Avatar.module.css';

function Avatar({ className = '', avatar, name, size = 'medium' }) {
  const sizeMod = styles[`Wrapper_size_${size}`];
  return (
    <div className={`${className} ${styles.Wrapper} ${sizeMod}`}>
      <img className={styles.Image} src={avatar} alt={name} />
      {/* <span className={`${styles.Status} ${styles.online}`}>1</span> */}
    </div>
  );
}

export default Avatar;
