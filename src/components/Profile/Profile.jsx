import React from 'react';
import style from './Profile.module.css';
import PostWall from './PostsWall/PostWall';
import { Tabs } from '../common/Tabs';
import { Tab } from '../common/Tab';
import { Route, useRouteMatch } from 'react-router-dom';

const Profile = (props) => {
  const { url } = useRouteMatch();
  return (
    <main className={style.grid}>
      <div className={style.picture}></div>
      <div className={style.tabs}>
        <Tabs>
          <Tab value={'Posts'} route={'posts'} />
          <Tab value={'About'} route={'about'} />
          <Tab value={'Friend'} route={'friend'} />
          <Tab value={'Photos'} route={'photos'} />
        </Tabs>
      </div>
      <Route path={`${url}/posts`}>
        <div className={style.aside}></div>
        <PostWall className={style.postwall} />
      </Route>
    </main>
  );
};

export default Profile;
