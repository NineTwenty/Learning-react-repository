import React, { useEffect } from 'react';
import style from './PostWall.module.css';
import { Post } from './Post/Post';
import PostingForm from './PostingForm';
import {
  fetchPosts,
  submitPost,
  selectPostsIds,
} from 'data/postSlice/postsSlice';
import { List } from 'components/common/List';
import { useSelector, useDispatch } from 'react-redux';

const PostWall = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    const interval = setInterval(() => {
      dispatch(fetchPosts());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const postsIds = useSelector(selectPostsIds);

  const posts = postsIds.map((id) => <Post id={id} key={id} />).reverse();

  return (
    <div className={style.postWall}>
      <PostingForm header='Create Post' onSubmit={submitPost} />
      <List>{posts}</List>
    </div>
  );
};

export default PostWall;
