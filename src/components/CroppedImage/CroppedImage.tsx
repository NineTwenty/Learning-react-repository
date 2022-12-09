import { useState, useCallback } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Lightbox from 'components/Lightbox/Lightbox';
import styles from './CroppedImage.module.scss';

type ImageProps = {
  src: string;
  alt: string;
  srcSet?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function CroppedImage({
  src,
  alt,
  srcSet,
  width = 300,
  height = 300,
  className,
}: ImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = cx(styles.Wrapper, { [`${className ?? ''}`]: className });

  const onClick = () => setIsOpen(true);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button type='button' className={classes} onClick={onClick}>
        <Image
          className={styles.Image}
          {...{ src, srcSet, alt, width, height }}
        />
      </button>
      {isOpen && (
        <Lightbox onClose={onClose}>
          <Image
            {...{ src, alt }}
            fill
            sizes='90vw'
            quality={100}
            style={{ objectFit: 'contain' }}
          />
        </Lightbox>
      )}
    </>
  );
}
