import { useState, useCallback } from 'react';
import styles from './CroppedImage.module.scss';
import cx from 'classnames';
import { Lightbox } from '../Lightbox/Lightbox';
import { Image } from '../Image/Image';

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
  const [isOpen, setIsOpen] = useState(false);
  const classes = cx(styles.Wrapper, { [`${className}`]: className });

  const onClick = () => setIsOpen(true);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div className={classes} onClick={onClick}>
        <img
          className={styles.Image}
          {...{ src, srcSet, alt, width, height }}
        />
      </div>
      {isOpen && (
        <Lightbox onClose={onClose}>
          <Image {...{ src, alt }} />
        </Lightbox>
      )}
    </>
  );
};
