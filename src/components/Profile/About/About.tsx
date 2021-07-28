import cx from 'classnames';
import styles from './About.module.scss';
import { Wrapper } from 'components/common/Wrapper/Wrapper';
import { Separator } from 'components/common/Separator';
import { useSelector } from 'react-redux';
import { selectUserById } from 'redux/entities';
import { Spinner } from 'components/common/Spinner';
import { useParams } from 'react-router-dom';

type AboutProps = {
  className?: string;
};

export const About = ({ className }: AboutProps) => {
  const classes = cx(styles.Wrapper, { [`${className}`]: className });
  // @ts-expect-error
  const { id } = useParams();

  const currentUser = useSelector(selectUserById(id));

  if (!currentUser) {
    return <Spinner />;
  }

  const birthDate = new Date(
    Date.parse(currentUser.birthDate)
  ).toLocaleDateString();

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
        <li>
          <span className={styles.Field}>Address: </span>
          {currentUser.address}
        </li>
        <li>
          <span className={styles.Field}>Phone Number: </span>
          {currentUser.phoneNumber}
        </li>
        <li>
          <span className={styles.Field}>Birth Date: </span>
          {birthDate}
        </li>
      </ul>
    </Wrapper>
  );
};
