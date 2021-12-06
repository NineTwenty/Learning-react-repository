import cx from 'classnames';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { selectUserById } from 'data/entities';
import Avatar from 'components/common/Avatar/Avatar';
import { Image } from 'components/common/Image/Image';
import { Wrapper } from 'components/common/Wrapper/Wrapper';
import Button from 'components/common/Button';
import { redirectToDialogByUser } from 'data/common/thunks';
import styles from './ProfileHeader.module.scss';

type ProfileHeaderProps = {
  className?: string;
};

export const ProfileHeader = ({ className }: ProfileHeaderProps) => {
  const classes = cx(styles.Wrapper, { [`${className ?? ''}`]: className });
  const { id } = useParams<{ id: string | undefined }>();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUserById(id));

  if (!id || !user) {
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
            onClick={() => dispatch(redirectToDialogByUser(id))}
            className={styles.DialogButton}
          >
            Message
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};
