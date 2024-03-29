import { useState } from 'react';
import cx from 'classnames';
import { useAppSelector, useIdParam } from 'utils/hooks/hooks';
import {
  selectDialogByMember,
  selectUserById,
  submitDialog,
} from 'data/entities';
import Avatar from 'components/Avatar/Avatar';
import Image from 'next/image';
import Wrapper from 'components/Wrapper/Wrapper';
import HamburgerButton from 'components/HamburgerButton';
import { selectCurrentUserId } from 'data';
import ButtonRedirectToDialog from 'components/Profile/ProfileHeader/ButtonWithRedirect';
import styles from './ProfileHeader.module.scss';

type ProfileHeaderProps = {
  className?: string;
};

export default function ProfileHeader({ className }: ProfileHeaderProps) {
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
        {user.avatar && (
          <Image
            className={styles.Image}
            alt='Profile'
            fill
            sizes='90vw'
            src={user.avatar}
          />
        )}
        <Avatar
          className={styles.Avatar}
          avatar={user.avatar}
          name={`${user.firstName} ${user.lastName}`}
          size='large'
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
