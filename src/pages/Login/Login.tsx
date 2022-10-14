import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useReferrerPath } from 'common/hooks/hooks';
import Button from 'common/components/Button';
import { Separator } from 'common/components/Separator';
import SignUpForm from 'pages/Login/SignUpForm';
import style from './Login.module.scss';
import LoginForm from './LoginForm';

type Props = {
  loggedIn: boolean;
};

function Login({ loggedIn }: Props) {
  const referrerPath = useReferrerPath();
  const [isUserHaveAccount, setIsUserHaveAccount] = useState(true);

  // Redirect if user already logged in
  if (loggedIn) {
    return <Navigate to={referrerPath} />;
  }

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
      </div>
    </div>
  );
}

export default Login;
