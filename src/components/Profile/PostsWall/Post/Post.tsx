import { useAppDispatch } from 'hooks/hooks';
import { useSelector } from 'react-redux';
import { useCurrentUser } from 'contexts/current-user-context';
import { deletePost } from 'data/entities/postsSlice';
import { selectPostById, selectUserById } from 'data/entities';
import { Separator } from 'components/common/Separator';
import Button from 'components/common/Button';
import Avatar from 'components/common/Avatar/Avatar';
import style from './Post.module.css';

function msToTime(ms: number) {
  const seconds = (ms / 1000).toFixed();
  const minutes = (ms / (1000 * 60)).toFixed();
  const hours = (ms / (1000 * 60 * 60)).toFixed();
  const days = (ms / (1000 * 60 * 60 * 24)).toFixed();
  if (+seconds < 60) return `${seconds} Sec`;
  if (+minutes < 60) return `${minutes} Min`;
  if (+hours < 24) return `${hours} Hrs`;
  return `${days} Days`;
}

type PostProps = {
  id: string;
};

export const Post = ({ id }: PostProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser();
  const post = useSelector(selectPostById(id));
  const author = useSelector(selectUserById(post?.author));

  if (!author || !post) {
    return null;
  }

  const currentDate = new Date();
  const postCreationDate = new Date(post?.created);
  const timePassed = msToTime(
    currentDate.valueOf() - postCreationDate.valueOf()
  );

  const fullName = `${author.firstName} ${author.lastName}`;

  return (
    <div className={style.post}>
      <div className={style.header}>
        <Avatar avatar={author.avatar} name={fullName} />
        <div className={style.title}>
          <h6 className={style.name}>{fullName}</h6>
          <span className={style.time}>Posted: {`${timePassed}`} ago</span>
        </div>
        {currentUser.id === post.author && (
          <Button onClick={() => dispatch(deletePost(id))}>Delete</Button>
        )}
      </div>
      <p>{post.postText}</p>
      <div className={style.meta}>
        {/* <span className={style.views}>Views: {post.views}</span> */}
      </div>
      <Separator />
    </div>
  );
};
