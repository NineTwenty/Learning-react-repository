import React from 'react';
import style from './Post.module.css';
import { useSelector } from 'react-redux';
import { getPostById } from 'data/postSlice/postsSlice';
import { Separator } from 'components/common/Separator';
import Button from 'components/common/Button';

export const Post = ({ id }) => {
  const post = useSelector(getPostById(id));

  return (
    <div className={style.post}>
      <div className={style.header}>
        <img
          className={style.avatar}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Roman_P.svg/100px-Roman_P.svg.png'
        ></img>
        <div className={style.title}>
          <h6 className={style.name}>Author Name</h6>
          <span className={style.time}>Time has passed</span>
        </div>
        <Button>Delete</Button>
      </div>
      <p>{post.postText}</p>
      <div className={style.meta}>
        <span className={style.views}>Views: {post.views}</span>
      </div>
      <Separator />
    </div>
  );
};
