import React from 'react';
import styles from './Checkbox.module.css';
import { Field } from 'formik';

const CheckboxField = ({ name, label, ...rest }) => {
  return (
    <div>
      <label className={styles.label}>
        <Field
          className={styles.checkInput}
          name={name}
          type='checkbox'
          {...rest}
        />
        <span className={styles.checkBox} />
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
