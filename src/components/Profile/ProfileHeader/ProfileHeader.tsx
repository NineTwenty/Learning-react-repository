import cx from 'classnames';
import styles from './ProfileHeader.module.scss';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/hooks';
import { selectUserById } from 'redux/entities';
import Avatar from 'components/common/Avatar/Avatar';
import { Image } from 'components/common/Image/Image';
import { Wrapper } from 'components/common/Wrapper/Wrapper';

type ProfileHeaderProps = {
  className?: string;
};

export const ProfileHeader = ({ className }: ProfileHeaderProps) => {
  const classes = cx(styles.Wrapper, { [`${className}`]: className });
  // @ts-expect-error
  const { id } = useParams();

  const user = useAppSelector(selectUserById(id));

  if (!user) {
    return null;
  }

  return (
    <Wrapper className={classes}>
      <div className={styles.Background}>
        <Image className={styles.Image} alt='Profile' src={user?.avatar} />
        <Avatar
          className={styles.Avatar}
          avatar={user.avatar}
          name={`${user.firstName} ${user.lastName}`}
        />
      </div>
      <h2 className={styles.Name}>{`${user.firstName} ${user.lastName}`}</h2>
    </Wrapper>
  );
};
