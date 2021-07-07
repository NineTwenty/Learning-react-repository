import cx from 'classnames';
import styles from './About.module.scss';
import { Wrapper } from 'components/common/Wrapper/Wrapper';
import { useCurrentUser } from 'contexts/current-user-context';
import { Separator } from 'components/common/Separator';

type AboutProps = {
  classname?: string;
};

export const About = ({ classname }: AboutProps) => {
  const classes = cx(styles.Wrapper, { classname });
  const currentUser = useCurrentUser();

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
