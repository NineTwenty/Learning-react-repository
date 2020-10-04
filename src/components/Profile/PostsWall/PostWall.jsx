import React, { useEffect } from 'react';
import style from './PostWall.module.css';
import { Post } from './Post/Post';
import PostingForm from './PostingForm';
import {
  submitPost,
  getPostsIds,
  updatePosts,
  getIsLoadingPostStatus,
} from 'data/postSlice/postsSlice';
import { List } from 'components/common/List';
import { useSelector, useDispatch } from 'react-redux';

const PostWall = () => {
  const dispatch = useDispatch();

  const postsIsLoading = useSelector(getIsLoadingPostStatus);

  // Update posts on each render
  // if there no active loading
  useEffect(() => {
    if (!postsIsLoading) {
      dispatch(updatePosts());
    }
  }, [dispatch, postsIsLoading]);

  const postsIds = useSelector(getPostsIds);

  const posts = postsIds.map((id) => <Post id={id} key={id} />).reverse();

  return (
    <div className={style.postWall}>
      <PostingForm header='Create Post' onSubmit={submitPost} />
      <List>{posts}</List>
    </div>
  );
};

export default PostWall;
