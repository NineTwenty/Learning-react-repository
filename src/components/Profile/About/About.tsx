import cx from 'classnames';
import Wrapper from 'components/Wrapper/Wrapper';
import Separator from 'components/Separator';
import { useSelector } from 'react-redux';
import { selectUserById } from 'data/entities';
import Spinner from 'components/Spinner';
import { useIdParam } from 'utils/hooks/hooks';
import styles from './About.module.scss';

type AboutProps = {
  className?: string;
};

export default function About({ className }: AboutProps) {
  const classes = cx(styles.Wrapper, { [`${className ?? ''}`]: className });
  const id = useIdParam();

  const currentUser = useSelector(selectUserById(id));

  if (!currentUser) {
    return <Spinner />;
  }

  const birthDate =
    currentUser.birthDate &&
    new Date(Date.parse(currentUser.birthDate)).toLocaleDateString();

  return (
    <Wrapper className={classes}>
      <h4 className={styles.Heading}>About</h4>
      <Separator />
      <ul className={styles.List}>
        <li>
          <span className={styles.Field}>First Name: </span>
          {currentUser.firstName}
        </li>
        <li>
          <span className={styles.Field}>Last Name: </span>
          {currentUser.lastName}
        </li>
        <li>
          <span className={styles.Field}>Email: </span>
          {currentUser.email}
        </li>
        {currentUser.address && (
          <li>
            <span className={styles.Field}>Address: </span>
            {currentUser.address}
          </li>
        )}
        {currentUser.phoneNumber && (
          <li>
            <span className={styles.Field}>Phone Number: </span>
            {currentUser.phoneNumber}
          </li>
        )}
        {currentUser.birthDate && (
          <li>
            <span className={styles.Field}>Birth Date: </span>
            {birthDate}
          </li>
        )}
      </ul>
    </Wrapper>
  );
}
