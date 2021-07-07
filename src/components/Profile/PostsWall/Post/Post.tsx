import React from 'react';
import style from './Post.module.css';
import { useSelector } from 'react-redux';
import { selectPostById } from 'redux/entities';
import { Separator } from 'components/common/Separator';
import Button from 'components/common/Button';
import { Post as PostType } from 'common/entities.types';

type PostProps = {
  id: string;
};

export const Post = ({ id }: PostProps) => {
  const post = useSelector(selectPostById(id)) as PostType;

  return (
    <div className={style.post}>
      <div className={style.header}>
        <img
          className={style.avatar}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Roman_P.svg/100px-Roman_P.svg.png'
          alt=''
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
