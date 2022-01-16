import { useCurrentUser } from 'contexts/current-user-context';
import { Card } from 'components/common/Card/Card';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { Wrapper } from 'components/common/Wrapper/Wrapper';
import style from './Profile.module.scss';
import PostWall from './PostsWall/PostWall';
import { Tabs } from '../common/Tabs';
import { Tab } from '../common/Tab';
import { FriendsGallery } from './FriendsGallery/FriendsGallery';
import { About } from './About/About';
import { ImagesGallery } from './ImagesGallery/ImagesGallery';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';

function Profile() {
  const {
    url,
    path,
    params: { id },
  } = useRouteMatch<{ id: string | undefined }>();

  // Define which user profile to show
  const currentUser = useCurrentUser();
  const currentProfileId = id || currentUser.id;

  return (
    <Switch>
      <Route path={`${path}/:entity`}>
        <main className={style.Wrapper}>
          <ProfileHeader />
          <div className={style.tabs}>
            <Tabs>
              <Tab value='Posts' route={`${url}/posts`} />
              <Tab value='About' route={`${url}/about`} />
              <Tab value='Friends' route={`${url}/friends`} />
              <Tab value='Photos' route={`${url}/photos`} />
            </Tabs>
          </div>
          <Switch>
            <Route path={`${path}/posts`}>
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
            </Route>
            <Route path={`${path}/about`}>
              <About />
            </Route>
            <Route path={`${path}/friends`}>
              <Wrapper className={style.Friends}>
                <FriendsGallery />
              </Wrapper>
            </Route>
            <Route path={`${path}/photos`}>
              <Wrapper className={style.Photos}>
                <ImagesGallery />
              </Wrapper>
            </Route>
            <Route path={`${path}`}>
              <Redirect to={`${url}/posts`} />
            </Route>
          </Switch>
        </main>
      </Route>
      <Route path='/'>
        <Redirect to={`${url}/${currentProfileId}/posts`} />
      </Route>
    </Switch>
  );
}

export default Profile;
