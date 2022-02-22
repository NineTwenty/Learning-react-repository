import { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Button from 'components/common/Button';
import { Separator } from 'components/common/Separator';
import SignUpModalForm from 'components/Login/SignUpModalForm';
import style from './Login.module.scss';
import LoginForm from './LoginForm';

function Login({ loggedIn }) {
  // Get redirected page path
  const location = useLocation();
  const { referrer } = location.state || { referrer: { pathname: '/profile' } };

  const [isOpen, setIsOpen] = useState(false);

  // Redirect if user already logged in
  if (loggedIn) return <Redirect to={referrer} />;

  return (
    <div className={style.Wrapper}>
      <div className={style.Meta} />
      <div className={style.Form}>
        <h1>Sign in</h1>
        <p>Enter your login or email address and password to sign in.</p>
        <LoginForm loggedIn={loggedIn} />
        <Separator className={style.Separator} />
        <h2>Don&#39;t have an account?</h2>
        <Button
          styleType='light'
          onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
        >
          Sign Up
        </Button>
        <SignUpModalForm isOpen={isOpen} />
      </div>
    </div>
  );
}

export default Login;
