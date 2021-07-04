import styles from './CroppedImage.module.scss';
import cx from 'classnames';

type ImageProps = {
  src: string;
  alt: string;
  srcSet?: string;
  width?: number;
  height?: number;
  className?: string;
};

export const CroppedImage = ({
  src,
  alt,
  srcSet,
  width,
  height,
  className,
}: ImageProps) => {
  const classes = cx(styles.Wrapper, { className });

  return (
    <div className={classes}>
      <img
        className={styles.Image}
        {...{ src, srcSet, alt, width, height }}
      />
    </div>
  );
};
