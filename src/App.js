import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import './colors.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Login from './components/Login/Login';

function PrivateRoute({ children, loggedIn, ...rest }) {
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

const App = ({ loggedIn }) => {
  return (
    <>
      <Switch>
        <Route path={'/login'}>
          <Login loggedIn={loggedIn} />
        </Route>
        <Route>
          <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
              <Switch>
                <PrivateRoute path='/dialogs/:id?' loggedIn={loggedIn}>
                  <DialogsContainer />
                </PrivateRoute>
                <PrivateRoute path='/profile' loggedIn={loggedIn}>
                  <Profile />
                </PrivateRoute>
                <PrivateRoute path='/news' loggedIn={loggedIn}>
                  <News />
                </PrivateRoute>
                <PrivateRoute path='/music' loggedIn={loggedIn}>
                  <Music />
                </PrivateRoute>
                <PrivateRoute path='/settings' loggedIn={loggedIn}>
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

const mapStateToProps = ({ authentication: { loggedIn } }) => ({ loggedIn });

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp;
