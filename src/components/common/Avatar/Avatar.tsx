import styles from './Avatar.module.css';

type Props = {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'fill';
  name: string;
  avatar?: string;
};

function Avatar({
  className = '',
  avatar = 'data:',
  name,
  size = 'medium',
}: Props) {
  const sizeMod = styles[`Wrapper_size_${size}`];
  return (
    <div className={`${className} ${styles.Wrapper} ${sizeMod}`}>
      <img className={styles.Image} src={avatar} alt={name} />
      {/* <span className={`${styles.Status} ${styles.online}`}>1</span> */}
    </div>
  );
}

export default Avatar;
