import { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Button from 'common/components/Button';
import { Separator } from 'common/components/Separator';
import SignUpForm from 'pages/Login/SignUpForm';
import style from './Login.module.scss';
import LoginForm from './LoginForm';

type Props = {
  loggedIn: boolean;
};

function Login({ loggedIn }: Props) {
  // Get redirected page path
  const location = useLocation<{ referrer: { pathname: string } }>();
  const { referrer } = location.state || {
    referrer: { pathname: '/profile' },
  };

  const [isUserHaveAccount, setIsUserHaveAccount] = useState(true);

  // Redirect if user already logged in
  if (loggedIn) return <Redirect to={referrer} />;

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
