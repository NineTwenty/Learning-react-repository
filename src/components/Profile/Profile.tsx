import React from 'react';
import style from './Profile.module.scss';
import PostWall from './PostsWall/PostWall';
import { Tabs } from '../common/Tabs';
import { Tab } from '../common/Tab';
import { Card } from 'components/common/Card/Card';
import { Route, useRouteMatch, Redirect } from 'react-router-dom';
import { FriendsGallery } from './FriendsGallery/FriendsGallery';
import { Wrapper } from 'components/common/Wrapper/Wrapper';
import { About } from './About/About';
import { ImagesGallery } from './ImagesGallery/ImagesGallery';

const Profile = () => {
  const { url } = useRouteMatch();

  return (
    <main className={style.Wrapper}>
      <div className={style.picture}></div>
      <div className={style.tabs}>
        <Tabs>
          <Tab value={'Posts'} route={'posts'} />
          <Tab value={'About'} route={'about'} />
          <Tab value={'Friends'} route={'friends'} />
          <Tab value={'Photos'} route={'photos'} />
        </Tabs>
      </div>
      <Route path={`${url}/posts`}>
        <div className={style.Content}>
          <div className={style.Aside}>
            <Card className={style.Card} header={'Friends'}>
              <FriendsGallery />
            </Card>
            <Card className={style.Card} header={'Photos'}>
              <ImagesGallery limit={6} />
            </Card>
          </div>
          <PostWall className={style.Postwall} />
        </div>
      </Route>
      <Route path={`${url}/about`}>
        <About />
      </Route>
      <Route path={`${url}/friends`}>
        <Wrapper className={style.Friends}>
          <FriendsGallery />
        </Wrapper>
      </Route>
      <Route path={`${url}/photos`}>
        <Wrapper className={style.Photos}>
          <ImagesGallery/>
        </Wrapper>
      </Route>
      <Redirect exact from={url} to={`${url}/posts`} />
    </main>
  );
};

export default Profile;
