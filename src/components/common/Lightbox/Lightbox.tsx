import { useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './Lightbox.module.scss';
import Button from '../Button';
import { Icon } from '../Icon/Icon';

type LightboxProps = {
  classname?: string;
  children: React.ReactNode;
  onClose?: Function;
};

export const Lightbox = ({
  classname,
  children,
  onClose = () => {},
}: LightboxProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const classes = cx(styles.Wrapper, { classname });

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
        styleType='Borderless'
        onClick={onClose}
      >
        <Icon color='white' type='close' />
      </Button>
      <div ref={wrapperRef} className={classes}>
        {children}
      </div>
    </div>
  );
};
