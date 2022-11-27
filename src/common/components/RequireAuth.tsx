import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedInStatus } from 'data';

type Props = {
  children: React.ReactNode;
};

export function RequireAuth({ children }: Props) {
  const { pathname } = useLocation();
  const loggedIn = useSelector(selectLoggedInStatus);

  return (
    // Fragment used to fix Route error "ReactNode is not a valid JSX element"
    // While placed in 'element' prop
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loggedIn ? (
        children
      ) : (
        <Navigate to='/login' state={{ referrer: pathname }} />
      )}
    </>
  );
}
