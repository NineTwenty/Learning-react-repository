import { useSelector } from 'react-redux';
import { selectDialogMemberId, selectUserById } from 'data/entities';
import type { Dialog, User } from 'utils/prismaUtils';
import styles from './Chat.module.css';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatBox from '../ChatBox/ChatBox';
import ChatInputs from '../ChatInputs/ChatInputs';

type Props = {
  className: string;
  dialogId: Dialog['id'];
  userId: User['id'];
};

function Chat({ className, dialogId, userId }: Props) {
  const memberId = useSelector(selectDialogMemberId(dialogId));
  const member = useSelector(selectUserById(memberId));

  const isLoaded = member;

  const classes = className
    ? `${className} ${styles.chatWrapper}`
    : styles.chatWrapper;

  return (
    <div className={classes}>
      {isLoaded && (
        <>
          <ChatHeader member={member} />
          <ChatBox {...{ dialogId, userId }} />
          <ChatInputs dialogId={dialogId} />
        </>
      )}
    </div>
  );
}

export default Chat;
