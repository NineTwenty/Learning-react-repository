import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  initialization,
  selectIsAppInitialized,
  selectLoggedInStatus,
} from 'data';
import Dialogs from 'common/components/Dialogs/Dialogs';
import Profile from 'common/components/Profile/Profile';
import HomeProfile from 'common/components/Profile/HomeProfile';
import Login from 'common/components/Login/Login';
import ClientContextProviders from 'common/components/ClientContextProviders';
import SplashScreen from 'common/components/SplashScreen/SplashScreen';
import Page from 'common/components/Page';
import { useAppDispatch } from 'common/hooks/hooks';

function App(): JSX.Element {
  const loggedIn = useSelector(selectLoggedInStatus);
  const isInitialized = useSelector(selectIsAppInitialized);
  const dispatch = useAppDispatch();

  // Initialization
  useEffect(() => {
    if (!isInitialized) {
      void dispatch(initialization());
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  if (!loggedIn) {
    return (
      <Routes>
        <Route path='/login' element={<Login loggedIn={loggedIn} />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    );
  }
  // Render
  return (
    <Routes>
      <Route path='/' element={<Page />}>
        {/* Index route to ensure that page isn't empty &
            profile always get necessary id param */}
        <Route index element={<HomeProfile />} />
        <Route path='profile/:id/*' element={<Profile />}>
          <Route path=':entity' element={<Profile />} />
        </Route>
        <Route path='dialogs' element={<Dialogs />}>
          <Route path=':id' element={<Dialogs />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default function AppWithClientProviders() {
  return (
    <ClientContextProviders>
      <App />
    </ClientContextProviders>
  );
}
