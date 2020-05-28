import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Chat from './Chat/Chat';

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

export default (props) => {
  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogs}>
        <h2>Dialogs</h2>
        {dialogsData.map((data) => (
          <Dialog {...data} />
        ))}
      </div>
      <Chat />
    </div>
  );
};
