import cx from 'classnames';
import styles from './ProfileHeader.module.scss';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { selectUserById, submitDialog } from 'redux/entities';
import Avatar from 'components/common/Avatar/Avatar';
import { Image } from 'components/common/Image/Image';
import { Wrapper } from 'components/common/Wrapper/Wrapper';
import Button from 'components/common/Button';

type ProfileHeaderProps = {
  className?: string;
};

export const ProfileHeader = ({ className }: ProfileHeaderProps) => {
  const classes = cx(styles.Wrapper, { [`${className}`]: className });
  // @ts-expect-error
  const { id } = useParams();
  const dispatch = useAppDispatch();

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
      <div className={styles.Name}>
        <h2>{`${user.firstName} ${user.lastName}`}</h2>
        <div className={styles.Buttons}>
          <Button
            onClick={() => dispatch(submitDialog(id))}
            className={styles.DialogButton}
          >
            Message
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};
