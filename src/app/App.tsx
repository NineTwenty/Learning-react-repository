import { useEffect, useRef, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  RouteProps,
} from 'react-router-dom';
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
import Login from 'pages/Login/Login';
import Header from 'common/components/Header/Header';
import { Navbar } from 'common/components/Navbar/Navbar';
import News from 'common/components/News/News';
import Music from 'common/components/Music/Music';
import Settings from 'common/components/Settings/Settings';
import { SplashScreen } from 'common/components/SplashScreen/SplashScreen';
import { CurrentUserProvider } from 'common/contexts/current-user-context';

function PrivateRoute({ children, ...rest }: RouteProps) {
  const loggedIn = useSelector(selectLoggedInStatus);
  const { component, render, exact, path, strict, sensitive } = rest;
  return (
    <Route
      {...{ component, render, exact, path, strict, sensitive }}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { referrer: location },
            }}
          />
        )
      }
    />
  );
}

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

  // Navbar related
  const [isSideNavForceOpen, setSideNavForceOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

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
    return <Redirect to={redirectLink} />;
  }

  // Render
  return (
    <Switch>
      <Route path='/login'>
        <Login loggedIn={loggedIn} />
      </Route>
      <PrivateRoute path='/'>
        <CurrentUserProvider>
          <div>
            <Header
              menuBtnRef={menuBtnRef}
              isSideNavForceOpen={isSideNavForceOpen}
              setSideNavForceOpen={setSideNavForceOpen}
            />
            <Navbar
              menuBtnRef={menuBtnRef}
              isSideNavForceOpen={isSideNavForceOpen}
              setSideNavForceOpen={setSideNavForceOpen}
            />
            <div>
              <Switch>
                <PrivateRoute path='/dialogs/:id?'>
                  <Dialogs />
                </PrivateRoute>
                <PrivateRoute path='/profile/:id?'>
                  <Profile />
                </PrivateRoute>
                <PrivateRoute path='/news'>
                  <News />
                </PrivateRoute>
                <PrivateRoute path='/music'>
                  <Music />
                </PrivateRoute>
                <PrivateRoute path='/settings'>
                  <Settings />
                </PrivateRoute>
                <Redirect exact from='/' to='/profile' />
              </Switch>
            </div>
          </div>
        </CurrentUserProvider>
      </PrivateRoute>
    </Switch>
  );
}

export default App;
