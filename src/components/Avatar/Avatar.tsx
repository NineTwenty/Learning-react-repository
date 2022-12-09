import Image from 'next/image';
import styles from './Avatar.module.css';

type Props = {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'fill';
  name: string;
  avatar?: string;
};

const basePx = 16;
const sizeEnum: { [key in Required<Props>['size']]: number | undefined } = {
  // basePx * rems in css * factor
  small: basePx * 2 * 2,
  medium: basePx * 3 * 2,
  large: basePx * 4 * 4,
  fill: undefined,
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
      <Image
        className={styles.Image}
        src={avatar}
        alt={name}
        width={sizeEnum[size]}
        height={sizeEnum[size]}
        fill={size === 'fill'}
        sizes={size === 'fill' ? `${sizeEnum.large!}px` : undefined}
      />
      {/* <span className={`${styles.Status} ${styles.online}`}>1</span> */}
    </div>
  );
}

export default Avatar;
