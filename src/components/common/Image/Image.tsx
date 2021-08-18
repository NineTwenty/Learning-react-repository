import cx from 'classnames';
import styles from './Image.module.scss';

interface ImageProps extends React.ComponentPropsWithoutRef<'img'> {
  className?: string;
}

export const Image = ({ src, alt, className, ...rest }: ImageProps) => {
  const classes = cx(styles.Image, { [`${className}`]: className });

  return <img className={classes} {...{ src, alt, ...rest }} />;
};
