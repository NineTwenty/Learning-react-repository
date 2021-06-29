import React from 'react';
import style from './Profile.module.scss';
import PostWall from './PostsWall/PostWall';
import { Tabs } from '../common/Tabs';
import { Tab } from '../common/Tab';
import { Route, useRouteMatch, Redirect } from 'react-router-dom';

const Profile = () => {
  const { url } = useRouteMatch();
  return (
    <main className={style.Wrapper}>
      <div className={style.picture}></div>
      <div className={style.tabs}>
        <Tabs>
          <Tab value={'Posts'} route={'posts'} />
          <Tab value={'About'} route={'about'} />
          <Tab value={'Friend'} route={'friend'} />
          <Tab value={'Photos'} route={'photos'} />
        </Tabs>
      </div>
      <div className={style.Content}>
        <Route path={`${url}/posts`}>
          <div className={style.Aside}></div>
          <PostWall className={style.Postwall}/>
        </Route>
      </div>
      <Redirect exact from={url} to={`${url}/posts`} />
    </main>
  );
};

export default Profile;
