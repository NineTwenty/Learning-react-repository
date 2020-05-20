import React from 'react';
import s from './Profile.module.css';
import Post from './Post/Post';

export default () => {
  return (
    <div>
      <div>
        <textarea name='' id='' cols='20' rows='5'></textarea>
        <button>Add post</button>
      </div>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};
