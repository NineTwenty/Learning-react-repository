import React from 'react';
import style from './Post.module.css';
import { useAppDispatch } from 'hooks/hooks';
import { useSelector } from 'react-redux';
import { useCurrentUser } from 'contexts/current-user-context';
import { deletePost } from 'redux/entities/postsSlice';
import { selectPostById, selectUserById } from 'redux/entities';
import { Separator } from 'components/common/Separator';
import Button from 'components/common/Button';
import { Post as PostType } from 'common/entities.types';
import Avatar from 'components/common/Avatar/Avatar';

type PostProps = {
  id: string;
};

export const Post = ({ id }: PostProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser();
  const post = useSelector(selectPostById(id)) as PostType;
  const author = useSelector(selectUserById(post?.author));

  if (!author || !post) {
    return null;
  }

  const fullName = `${author.firstName} ${author.lastName}`;

  return (
    <div className={style.post}>
      <div className={style.header}>
        <Avatar avatar={author.avatar} name={fullName} />
        <div className={style.title}>
          <h6 className={style.name}>{fullName}</h6>
          <span className={style.time}>Time has passed</span>
        </div>
        {currentUser.id === post.author && (
          <Button onClick={() => dispatch(deletePost(id))}>Delete</Button>
        )}
      </div>
      <p>{post.postText}</p>
      <div className={style.meta}>
        <span className={style.views}>Views: {post.views}</span>
      </div>
      <Separator />
    </div>
  );
};
