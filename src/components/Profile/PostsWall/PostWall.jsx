import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { submitPost, fetchFeed, selectFeedById } from 'data/entities';
import { List } from 'components/common/List';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import PostingForm from './PostingForm';
import { Post } from './Post/Post';
import style from './PostWall.module.css';

const PostWall = ({ className }) => {
  const dispatch = useDispatch();
  const { id: feedId } = useParams();

  const feed = useSelector(selectFeedById(feedId));
  const posts = feed?.posts.map((id) => <Post id={id} key={id} />).reverse();

  useEffect(() => {
    dispatch(fetchFeed(feedId));
    const interval = setInterval(() => {
      dispatch(fetchFeed(feedId));
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch, feedId]);

  const classes = cx(style.postWall, { [`${className}`]: className });

  return (
    <div className={classes}>
      <PostingForm header='Create Post' onSubmit={submitPost} />
      <List>{posts}</List>
    </div>
  );
};

export default PostWall;
