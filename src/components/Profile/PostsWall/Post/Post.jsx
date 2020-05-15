import React from 'react';
import s from './Post.module.css';

export default () => {
  return (
    <dev className={s.post}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Roman_P.svg/100px-Roman_P.svg.png'></img>
      Post text
      <div>
        <span>Like</span>
      </div>
    </dev>
  );
};
