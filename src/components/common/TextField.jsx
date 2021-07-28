import React from 'react';
import style from './TextField.module.css';
import { Field, ErrorMessage } from 'formik';

const TextField = ({ name, label, type, ...rest }) => {
  return (
    <div className={style.wrapper}>
      <label className={style.label}>
        {label}
        <div className={style.field}>
          <Field name={name} type={type || 'text'} {...rest} />
          <span className={style.error}>
            <ErrorMessage name={name} />
          </span>
        </div>
      </label>
    </div>
  );
};

export default TextField;
