import { useEffect } from 'react';
import { Card } from 'common/components/Card/Card';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Wrapper } from 'common/components/Wrapper/Wrapper';
import { Tabs } from 'common/components/Tabs';
import { Tab } from 'common/components/Tab';
import style from './Profile.module.scss';
import PostWall from './PostsWall/PostWall';
import { FriendsGallery } from './FriendsGallery/FriendsGallery';
import { About } from './About/About';
import { ImagesGallery } from './ImagesGallery/ImagesGallery';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';

function Profile() {
  const { entity } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!entity) {
      navigate(`posts`, { replace: true });
    }
  }, [entity, navigate]);

  return (
    <main className={style.Wrapper}>
      <ProfileHeader />
      <div className={style.tabs}>
        <Tabs>
          <Tab value='Posts' route='posts' />
          <Tab value='About' route='about' />
          <Tab value='Friends' route='friends' />
          <Tab value='Photos' route='photos' />
        </Tabs>
      </div>
      <Routes>
        <Route
          path='posts'
          element={
            <div className={style.Content}>
              <div className={style.Aside}>
                <Card className={style.Card} header='Friends'>
                  <FriendsGallery limit={6} />
                </Card>
                <Card className={style.Card} header='Photos'>
                  <ImagesGallery limit={6} />
                </Card>
              </div>
              <PostWall className={style.Postwall} />
            </div>
          }
        />
        <Route path='about' element={<About />} />
        <Route
          path='friends'
          element={
            <Wrapper className={style.Friends}>
              <FriendsGallery />
            </Wrapper>
          }
        />
        <Route
          path='photos'
          element={
            <Wrapper className={style.Photos}>
              <ImagesGallery />
            </Wrapper>
          }
        />
      </Routes>
    </main>
  );
}

export default Profile;
