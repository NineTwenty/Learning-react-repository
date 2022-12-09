import cx from 'classnames';
import Separator from 'components/Separator';
import Wrapper from 'components/Wrapper/Wrapper';
import styles from './Card.module.scss';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  header: string;
};

export default function Card({ children, className, header }: CardProps) {
  const classes = cx(styles.CardWrapper, className);

  return (
    <Wrapper className={classes}>
      <header className={styles.Header}>
        <h4 className={styles.Heading}>{header}</h4>
      </header>
      <Separator />
      <div className={styles.Content}>{children}</div>
    </Wrapper>
  );
}
