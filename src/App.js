import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import './colors.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';

function App(props) {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={() => <Dialogs data={props.dialogsData} addMessage={props.addMessage} updateTextareaContent={props.updateTextareaContent}/>} />
          <Route path='/profile' render={() => <Profile {...props.profileData} />} />
          <Route path='/news' render={() => <News {...props.newsData} />} />
          <Route path='/music' render={() => <Music {...props.musicData} />} />
          <Route path='/settings' render={() => <Settings {...props.settingsData} />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
