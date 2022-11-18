import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import Button from 'common/components/Button';
import { selectDialogByMember, submitDialog } from 'data/entities';

type Props = {
  selector: ReturnType<typeof selectDialogByMember>;
  thunk: ReturnType<typeof submitDialog>;
  children: React.ReactNode;
  className: string;
};

export default function ButtonRedirectToDialog({
  selector,
  thunk,
  children,
  className,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let data = useAppSelector(selector);

  const onClick = () => {
    void (async () => {
      if (!data) {
        data = await dispatch(thunk);
      }

      if (data) {
        navigate(`/dialogs/${data.id}`);
      }
    })();
  };

  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
}
