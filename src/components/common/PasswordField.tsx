import React from 'react';
import TextField from './TextField';

const PasswordField = (props) => {
  return (
    <>
      <TextField type='password' {...props} />
    </>
  );
};

export default PasswordField;
