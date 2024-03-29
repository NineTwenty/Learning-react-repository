import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectDialogMemberId, selectUserById } from 'data/entities';
import Spinner from 'components/Spinner';
import Avatar from 'components/Avatar/Avatar';
import type { Dialog } from 'utils/prismaUtils';
import styles from './DialogItem.module.scss';

type Props = {
  id: Dialog['id'];
  isChosen: boolean;
};

export default function DialogItem({ id, isChosen }: Props) {
  const memberId = useSelector(selectDialogMemberId(id));
  const user = useSelector(selectUserById(memberId));

  if (!user) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const { avatar, firstName } = user;

  const chosenClasses = `${styles.DialogItem} ${styles.DialogItem_chosen}`;
  const wrapperClasses = isChosen ? chosenClasses : styles.DialogItem;

  return (
    <div className={wrapperClasses}>
      <Avatar size='medium' avatar={avatar} name={firstName} />
      <div className={styles.Preview}>
        <h5 className={styles.Name}>{firstName}</h5>
        <p className={styles.Message} />
      </div>
      {/* <div className={styles.Meta}>
        <span className={styles.Count}>{count}</span>
        <span className={styles.Passed}>{time}</span>
      </div> */}
      <Link to={`/dialogs/${id}`} className={styles.Link} />
    </div>
  );
}
