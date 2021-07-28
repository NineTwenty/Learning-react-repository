import React from 'react';
import style from './Login.module.scss';
import LoginForm from './LoginForm';
import { Redirect, useLocation } from 'react-router-dom';

const Login = ({ loggedIn }) => {
  // Get redirected page path
  const location = useLocation();
  const { referrer } = location.state || { referrer: { pathname: '/profile' } };

  // Redirect if user already logged in
  if (loggedIn) return <Redirect to={referrer} />;

  return (
    <div className={style.Wrapper}>
        <div className={style.Meta}></div>
        <div className={style.Form}>
          <h1>Sign in</h1>
          <p>Enter your login or email address and password to sign in.</p>
          <LoginForm loggedIn={loggedIn} />
        </div>
    </div>
  );
};

export default Login;
