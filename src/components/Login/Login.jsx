import React from 'react';
import style from './Login.module.css';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';

const Login = ({ loggedIn }) => {
  // Redirect if user already logged in
  if (loggedIn) return <Redirect to={'/'} />;

  return (
    <div className={style.login}>
      <div className={style.background}></div>
      <div className={style.content}>
        <div className={style.carousel}></div>
        <div className={style.form}>
          <h1>Sign in</h1>
          <p>Enter your login or email address and password to sign in.</p>
          <LoginForm loggedIn={loggedIn} />
        </div>
      </div>
    </div>
  );
};

export default Login;
