import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { fetchUsers, selectUserById, selectUsersByIds } from 'data/entities';
import Avatar from 'common/components/Avatar/Avatar';
import { Gallery } from 'common/components/Gallery/Gallery';
import { useIdParam } from 'common/hooks/hooks';
import styles from './FriendsGallery.module.scss';

type FriendsGalleryProps = {
  className?: string;
  limit?: number;
};

export function FriendsGallery({ className, limit }: FriendsGalleryProps) {
  const dispatch = useDispatch();

  // Fetch all users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Get routing data
  const id = useIdParam();

  const user = useSelector(selectUserById(id));

  // Get friends
  const friendsIds = user?.friends || [];
  const friends = useSelector(selectUsersByIds(friendsIds));

  const friendsCards = friends.map((friend) => {
    if (!friend) {
      return null;
    }

    // Generate link path
    const linkToFriend = generatePath('/profile/:id', { id: friend.id });

    return (
      <Link
        className={styles.Link}
        to={linkToFriend}
        key={friend.id}
        aria-label={`To ${friend.firstName} ${friend.lastName} profile`}
      >
        <Avatar
          size='fill'
          avatar={friend.avatar}
          name={`${friend.firstName} ${friend.lastName}`}
        />
        <h6 className={styles.FriendName}>
          <span>{friend.firstName}</span>
          <span>{friend.lastName}</span>
        </h6>
      </Link>
    );
  });

  return (
    <Gallery className={className} limit={limit}>
      {friendsCards}
    </Gallery>
  );
}
