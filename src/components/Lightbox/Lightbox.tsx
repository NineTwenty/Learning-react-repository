import { useEffect, useRef } from 'react';
import cx from 'classnames';
import { MdClose } from 'react-icons/md';
import styles from './Lightbox.module.scss';
import Button from '../Button';

type LightboxProps = {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
};

export default function Lightbox({
  className,
  children,
  onClose = () => {},
}: LightboxProps) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const classes = cx(styles.Wrapper, { [`${className ?? ''}`]: className });

  // Close on click outside
  useEffect(() => {
    // Click event handler
    const onOutsideClick = ({ target }: MouseEvent) => {
      if (target instanceof HTMLElement) {
        if (backgroundRef.current === target || wrapperRef.current === target) {
          onClose();
        }
      }
    };

    window.addEventListener('click', onOutsideClick);

    return () => window.removeEventListener('click', onOutsideClick);
  }, [onClose]);

  return (
    <div ref={backgroundRef} className={styles.Background}>
      <Button
        className={styles.CloseBtn}
        styleType='borderless'
        onClick={onClose}
      >
        <MdClose />
      </Button>
      <div ref={wrapperRef} className={classes}>
        {children}
      </div>
    </div>
  );
}
