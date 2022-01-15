import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, Link, useRouteMatch } from 'react-router-dom';
import { fetchUsers, selectUserById, selectUsersByIds } from 'data/entities';
import Avatar from 'components/common/Avatar/Avatar';
import { Gallery } from 'components/common/Gallery/Gallery';
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
  const {
    path,
    params: { url, id, entity },
  } = useRouteMatch<{ url: string; id: string; entity: string }>();

  const user = useSelector(selectUserById(id));

  // Get friends
  const friendsIds = user?.friends || [];
  const friends = useSelector(selectUsersByIds(friendsIds));

  const friendsCards = friends.map((friend) => {
    if (!friend) {
      return null;
    }

    // Generate link path
    const linkToFriend = generatePath(path, { url, id: friend.id, entity });

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
