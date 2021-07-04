import styles from './Gallery.module.scss';
import cx from 'classnames';

type GalleryProps = {
  children: React.ReactNode;
  className?: string;
};

export const Gallery = ({ children, className }: GalleryProps) => {
  const classes = cx(styles.Wrapper, { className });

  return <div className={classes}>{children}</div>;
};
