import React from 'react';
import style from './Profile.module.scss';
import { useCurrentUser } from 'contexts/current-user-context';
import PostWall from './PostsWall/PostWall';
import { Tabs } from '../common/Tabs';
import { Tab } from '../common/Tab';
import { Card } from 'components/common/Card/Card';
import { Gallery } from 'components/common/Gallery/Gallery';
import { CroppedImage } from 'components/common/CroppedImage/CroppedImage';
import { Route, useRouteMatch, Redirect } from 'react-router-dom';
import { FriendsGallery } from './FriendsGallery/FriendsGallery';
import { Wrapper } from 'components/common/Wrapper/Wrapper';
import { About } from './About/About'

const Profile = () => {
  const { url } = useRouteMatch();
  const currentUser = useCurrentUser()

  const images = currentUser ? currentUser.images : [];

  const croppedImages = Array.isArray(images)
    ? images.map(({ src, id }) => <CroppedImage key={id} src={src} alt='' />)
    : images;

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
              <Gallery limit={6}>{croppedImages}</Gallery>
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
          <Gallery>{croppedImages}</Gallery>
        </Wrapper>
      </Route>
      <Redirect exact from={url} to={`${url}/posts`} />
    </main>
  );
};

export default Profile;
