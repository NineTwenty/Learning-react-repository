import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const dialogsData = [
  {
    avatar: 'https://loremflickr.com/48/48?r=1',
    name: 'Charles',
    messages: `I'm stupid`,
    count: 16,
    time: '1min',
    id: 1,
  },
  {
    avatar: 'https://loremflickr.com/48/48?r=2',
    name: 'Lando',
    messages: `Its BWOKEN`,
    count: 4,
    time: '2min',
    id: 2,
  },
  {
    avatar: 'https://loremflickr.com/48/48?r=3',
    name: 'Max',
    messages: `What a f*****g idiot`,
    count: 0,
    time: '',
    id: 3,
  },
  {
    avatar: 'https://loremflickr.com/48/48?r=4',
    name: 'Charles',
    messages: `I'm stupid`,
    count: 0,
    time: '',
    id: 4,
  },
];

const appData = {
  dialogsData,
};

ReactDOM.render(
  <React.StrictMode>
    <App {...appData} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
