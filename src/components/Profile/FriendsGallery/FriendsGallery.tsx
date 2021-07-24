import styles from './FriendsGallery.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUserById, selectUsersByIds } from 'redux/entities';
import Avatar from 'components/common/Avatar/Avatar';
import { Gallery } from 'components/common/Gallery/Gallery';
import { generatePath, Link, useRouteMatch } from 'react-router-dom';

type FriendsGalleryProps = {
  classname?: string;
};

export const FriendsGallery = ({ classname }: FriendsGalleryProps) => {
  const dispatch = useDispatch();

  // Fetch all users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Get routing data
  const {
    path,
    // @ts-expect-error
    params: { url, id, entity },
  } = useRouteMatch();

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
          size={'fill'}
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
    <Gallery className={classname} limit={6}>
      {friendsCards}
    </Gallery>
  );
};
