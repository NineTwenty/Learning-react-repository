import React from 'react';
import s from './Profile.module.css';
import PostWall from './PostsWall/PostWall';

export default () => (
  <main className={s.profile}>
    <div>
      <img src='https://imagekit.io/static/img/newPages/wave-bg.svg'></img>
    </div>
    <div>Profile img, description</div>
    <PostWall />
  </main>
);
