import React from 'react';
import style from './PostWall.module.css';
import Post from './Post/Post';
import PostingForm from './PostingForm';
import { submitPost } from 'data/postSlice/postsSlice';

const PostWall = () => {
  return (
    <div>
      <PostingForm header='Create Post' onSubmit={submitPost} />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default PostWall;