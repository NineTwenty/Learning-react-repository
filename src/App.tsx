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
import Header from 'components/Header/Header';
import Dialogs from 'components/Dialogs/Dialogs';
import {
  initialization,
  redirected,
  selectIsAppInitialized,
  selectLoggedInStatus,
  selectRedirectLink,
} from 'data';
import { Navbar } from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import { CurrentUserProvider } from './contexts/current-user-context';

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
