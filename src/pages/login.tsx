import { useEffect, useState } from 'react';
import { MdInfo } from 'react-icons/md';
import { useRouter } from 'next/router';
import Button from 'components/Button';
import Separator from 'components/Separator';
import SignUpForm from 'components/Login/SignUpForm';
import SplashScreen from 'components/SplashScreen/SplashScreen';
import style from 'components/Login/Login.module.scss';
import LoginForm from 'components/Login/LoginForm';
import { selectLoggedInStatus } from 'data';
import { useAppSelector } from 'utils/hooks/hooks';

function Login() {
  const loggedIn = useAppSelector(selectLoggedInStatus);
  const router = useRouter();
  const [isUserHaveAccount, setIsUserHaveAccount] = useState(true);

  useEffect(() => {
    // Redirect if user already logged in
    if (loggedIn) {
      void router.push('/profile');
    }
  }, [loggedIn, router]);

  if (loggedIn) return <SplashScreen />;

  return (
    <div className={style.Wrapper}>
      <div className={style.Meta} />
      <div className={style.Form}>
        {isUserHaveAccount ? <LoginForm /> : <SignUpForm />}
        <Separator className={style.Separator} />
        {isUserHaveAccount ? (
          <h2>Don&#39;t have an account?</h2>
        ) : (
          <h2>Already have an account?</h2>
        )}
        <Button
          styleType='light'
          onClick={() =>
            setIsUserHaveAccount(
              (currentIsUserHaveAccount) => !currentIsUserHaveAccount
            )
          }
        >
          {isUserHaveAccount ? 'Sign Up' : 'Sign In'}
        </Button>
        {isUserHaveAccount ? (
          <footer className={style.Footer}>
            <MdInfo className={style.InfoIcon} />
            To sign in use &apos;admin&apos; as login and password.
          </footer>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
