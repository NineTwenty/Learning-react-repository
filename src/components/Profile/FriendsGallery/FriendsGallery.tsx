import styles from './FriendsGallery.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCurrentUser } from 'contexts/current-user-context';
import { fetchUsers, selectUsersByIds } from 'redux/entities';
import Avatar from 'components/common/Avatar/Avatar';
import { Gallery } from 'components/common/Gallery/Gallery';

type FriendsGalleryProps = {
  classname?: string;
};

export const FriendsGallery = ({ classname }: FriendsGalleryProps) => {
  const dispatch = useDispatch();

  // Fetch all users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const currentUser = useCurrentUser();

  // Get friends
  const friendsIds = currentUser?.friends || [];
  const friends = useSelector(selectUsersByIds(friendsIds));

  const friendsCards = friends.map((friend) => {
    if (!friend) {
      return null;
    }

    return (
      <div key={friend.id}>
        <Avatar
          size={'fill'}
          avatar={friend.avatar}
          name={`${friend.firstName} ${friend.lastName}`}
        />
        <h6 className={styles.FriendName}>
          <span>{friend.firstName}</span>
          <span>{friend.lastName}</span>
        </h6>
      </div>
    );
  });

  return (
    <Gallery className={classname} limit={6}>
      {friendsCards}
    </Gallery>
  );
};
