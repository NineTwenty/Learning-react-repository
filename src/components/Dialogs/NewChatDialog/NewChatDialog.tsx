import cx from 'classnames';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'utils/hooks/hooks';
import { useCurrentUser } from 'utils/contexts/current-user-context';
import { fetchUsers, selectUsersByIds, submitDialog } from 'data/entities';
import Dialog from 'components/Dialog/Dialog';
import Avatar from 'components/Avatar/Avatar';
import Button from 'components/Button';
import styles from './NewChatDialog.module.scss';

interface NewChatDialogProps extends React.ComponentPropsWithoutRef<'div'> {
  onClose: () => void;
}

export default function NewChatDialog({
  onClose,
  className,
}: NewChatDialogProps) {
  const dispatch = useAppDispatch();

  const currentUser = useCurrentUser();

  useEffect(() => {
    void dispatch(fetchUsers());
  }, [dispatch]);

  const friends = useSelector(selectUsersByIds(currentUser.friends));

  const friendsList = friends.map((user) => {
    if (!user) return null;
    const createDialog = () => {
      void dispatch(submitDialog(user.id));
    };

    return (
      <li key={user.id}>
        <Button styleType='borderless' onClick={createDialog}>
          <Avatar name={user.fullName} avatar={user.avatar} />
          <h5>{user.fullName}</h5>
        </Button>
      </li>
    );
  });

  const classes = cx(styles.Wrapper, className);

  return (
    <Dialog className={classes} onClose={onClose}>
      <h3 className={styles.Heading}>Friends:</h3>
      <ul className={styles.List}>{friendsList}</ul>
    </Dialog>
  );
}
