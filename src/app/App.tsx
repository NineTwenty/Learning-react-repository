import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './constants.css';
import {
  initialization,
  redirected,
  selectIsAppInitialized,
  selectLoggedInStatus,
  selectRedirectLink,
} from 'data';
import Dialogs from 'pages/Dialogs/Dialogs';
import Profile from 'pages/Profile/Profile';
import HomeProfile from 'pages/Profile/HomeProfile';
import Login from 'pages/Login/Login';
import { SplashScreen } from 'common/components/SplashScreen/SplashScreen';
import { Page } from 'common/components/Page';

function App(): JSX.Element {
  const loggedIn = useSelector(selectLoggedInStatus);
  const isInitialized = useSelector(selectIsAppInitialized);
  const redirectLink = useSelector(selectRedirectLink);
  const location = useLocation();
  const dispatch = useDispatch();

  // Initialization
  useEffect(() => {
    if (!isInitialized) {
      dispatch(initialization());
    }
  }, [dispatch, isInitialized]);

  // Check if delayed redirect happend & inform state about it
  useEffect(() => {
    if (redirectLink) {
      // Prevent early state update & rerender before redirect even happen
      if (location.pathname === redirectLink) {
        dispatch(redirected());
      }
    }
  }, [redirectLink, location.pathname, dispatch]);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  // Delayed redirect to stored path
  if (redirectLink) {
    return <Navigate to={redirectLink} />;
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
      <Route path='/login' element={<Login loggedIn={loggedIn} />} />
      {/* Redirect to valid default page */}
      <Route
        path='*'
        element={loggedIn ? <Navigate to='/' /> : <Navigate to='/login' />}
      />
    </Routes>
  );
}

export default App;
