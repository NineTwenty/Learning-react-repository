import React from 'react';
import style from './Profile.module.scss';
import PostWall from './PostsWall/PostWall';
import { Tabs } from '../common/Tabs';
import { Tab } from '../common/Tab';
import { Card } from 'components/common/Card/Card';
import { Gallery } from 'components/common/Gallery/Gallery';
import { CroppedImage } from 'components/common/CroppedImage/CroppedImage';
import { Route, useRouteMatch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from 'redux/entities';
import { selectCurrentUserId } from '../../redux';
import { FriendsGallery } from './FriendsGallery/FriendsGallery';
import { Wrapper } from 'components/common/Wrapper/Wrapper';

const Profile = () => {
  const { url } = useRouteMatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const currentUser = useSelector(selectUserById(currentUserId));

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
