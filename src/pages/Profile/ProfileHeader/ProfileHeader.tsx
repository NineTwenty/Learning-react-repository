import { useState } from 'react';
import cx from 'classnames';
import { useAppSelector, useIdParam } from 'common/hooks/hooks';
import {
  selectDialogByMember,
  selectUserById,
  submitDialog,
} from 'data/entities';
import Avatar from 'common/components/Avatar/Avatar';
import { Image } from 'common/components/Image/Image';
import { Wrapper } from 'common/components/Wrapper/Wrapper';
import { HamburgerButton } from 'common/components/HamburgerButton';
import { selectCurrentUserId } from 'data';
import ButtonRedirectToDialog from 'pages/Profile/ProfileHeader/ButtonWithRedirect';
import styles from './ProfileHeader.module.scss';

type ProfileHeaderProps = {
  className?: string;
};

export function ProfileHeader({ className }: ProfileHeaderProps) {
  const classes = cx(styles.Wrapper, { [`${className ?? ''}`]: className });
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const id = useIdParam();
  const loggedUserId = useAppSelector(selectCurrentUserId);
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
      </div>
      <div
        className={cx(styles.Controls, {
          [styles.Controls__open]: isControlsOpen,
        })}
        data-testid='profileControls'
      >
        {user.id !== loggedUserId && (
          <HamburgerButton
            className={styles.ButtonsToggle}
            type='button'
            iconType='arrows'
            isOpen={isControlsOpen}
            onClick={() => setIsControlsOpen(!isControlsOpen)}
          />
        )}
        <div className={styles.Buttons}>
          {user.id !== loggedUserId && (
            <ButtonRedirectToDialog
              selector={selectDialogByMember(id)}
              thunk={submitDialog(id)}
              className={styles.DialogButton}
            >
              Message
            </ButtonRedirectToDialog>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
