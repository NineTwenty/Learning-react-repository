import React from 'react';
import style from './TextAreaField.module.css';
import { Field } from 'formik';

export const TextAreaField = ({ children, className, ...rest }) => {
  return (
    <Field as='textarea' className={`${style.textArea} ${className}`} {...rest}>
      {children}
    </Field>
  );
};
