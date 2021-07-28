import styles from './Gallery.module.scss';
import cx from 'classnames';

type GalleryProps = {
  children: React.ReactNode;
  className?: string;
  limit?: number;
};

export const Gallery = ({ children, className, limit }: GalleryProps) => {
  const classes = cx(styles.Wrapper, { className });
  const items =
    Array.isArray(children) && limit ? children.slice(0, limit) : children;

  return <div className={classes}>{items}</div>;
};
