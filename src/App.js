import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './constants.css';
import Header from 'components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Login from './components/Login/Login';
import {
  authorizationRequest,
  selectLoggedInStatus,
} from './redux/authSlice';

function PrivateRoute({ children, ...rest }) {
  const loggedIn = useSelector(selectLoggedInStatus);

  return (
    <Route
      {...rest}
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

const App = () => {
  const loggedIn = useSelector(selectLoggedInStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedIn) {
      // Authorization request in case the JWT is present in localStorage
      dispatch(authorizationRequest());
    }
  }, [dispatch, loggedIn]);

  const [isSideNavForceOpen, setSideNavForceOpen] = useState(false);

  return (
    <>
      <Switch>
        <Route path={'/login'}>
          <Login loggedIn={loggedIn} />
        </Route>
        <Route>
          <div className='app-wrapper'>
            <Header
              isSideNavForceOpen={isSideNavForceOpen}
              setSideNavForceOpen={setSideNavForceOpen}
            />
            <Navbar isSideNavForceOpen={isSideNavForceOpen} />
            <div className='app-wrapper-content'>
              <Switch>
                <PrivateRoute path='/dialogs/:id?'>
                  <DialogsContainer />
                </PrivateRoute>
                <PrivateRoute path='/profile'>
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
                <Redirect exact path='/' to='/login' />
              </Switch>
            </div>
          </div>
        </Route>
      </Switch>
    </>
  );
};

export default App;
