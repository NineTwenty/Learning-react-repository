import React from 'react';
import styles from './StatusErrors.module.css';
import { useFormikContext } from 'formik';

export const StatusErrors = (props) => {
  // Get form status from context
  const { status } = useFormikContext();
  // Take errors if there any
  const formErrors = (status && status.formErrors) || '';
  // Map them to list items
  const errorsList = formErrors
    ? formErrors.map((err, i) => <li key={i}>{err}</li>)
    : '';

  return <ul className={styles.errors}>{errorsList}</ul>;
};

export default StatusErrors;
