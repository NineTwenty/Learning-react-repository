import { useSelector } from 'react-redux';
import { selectLoggedInStatus } from 'data';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SplashScreen from 'common/components/SplashScreen/SplashScreen';

type Props = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: Props) {
  const router = useRouter();
  const loggedIn = useSelector(selectLoggedInStatus);

  useEffect(() => {
    if (!loggedIn) {
      void router.push('/login');
    }
  }, [loggedIn, router]);
  if (!loggedIn) return <SplashScreen />;

  // Fragment used to fix react-router Route error "ReactNode is not a valid JSX element"
  // While placed in 'element' prop
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
