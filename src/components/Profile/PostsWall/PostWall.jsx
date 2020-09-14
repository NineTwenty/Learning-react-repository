import React from 'react';
import style from './PostWall.module.css';
import Post from './Post/Post';
import PostingForm from './PostingForm';
import { submitPost } from 'data/postSlice/postsSlice';
import { List } from 'components/common/List';

const PostWall = () => {
  return (
    <div>
      <PostingForm header='Create Post' onSubmit={submitPost} />
      <List>
        <Post id='1' />
        <Post id='2' />
        <Post id='4' />
      </List>
    </div>
  );
};

export default PostWall;
