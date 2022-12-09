import { useEffect } from 'react';
import { submitPost, fetchFeed, selectFeedById } from 'data/entities';
import List from 'components/List';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { useAppDispatch, useIdParam } from 'utils/hooks/hooks';
import PostingForm from './PostingForm';
import Post from './Post/Post';
import style from './PostWall.module.css';

type Props = {
  className: string;
};

function PostWall({ className }: Props) {
  const dispatch = useAppDispatch();
  const feedId = useIdParam();

  if (!feedId) {
    throw new Error(`id URL param is not set`);
  }

  const feed = useSelector(selectFeedById(feedId));
  const posts = feed?.posts.map((id) => <Post id={id} key={id} />).reverse();

  useEffect(() => {
    void dispatch(fetchFeed(feedId));
    const interval = setInterval(() => {
      void dispatch(fetchFeed(feedId));
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch, feedId]);

  const classes = cx(style.postWall, { [`${className}`]: className });

  return (
    <div className={classes}>
      <PostingForm header='Create Post' onSubmit={submitPost} />
      {posts?.length ? <List>{posts}</List> : null}
    </div>
  );
}

export default PostWall;
