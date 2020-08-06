import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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

const App = ({ loggedIn }) => {
  return (
    <BrowserRouter>
      <Route path='/'>
        {loggedIn ? (
          <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
              <Switch>
                <Route path='/dialogs/:id?'>
                  <DialogsContainer />
                </Route>
                <Route path='/profile' render={() => <Profile />} />
                <Route path='/news' render={() => <News />} />
                <Route path='/music' render={() => <Music />} />
                <Route path='/settings' render={() => <Settings />} />
              </Switch>
            </div>
          </div>
        ) : (
          <Redirect to={'/login'} />
        )}
      </Route>
      <Route path={'/login'}>
        <Login loggedIn={loggedIn} />
      </Route>
    </BrowserRouter>
  );
};

const mapStateToProps = ({ authentication: { loggedIn } }) => ({ loggedIn });

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp;
