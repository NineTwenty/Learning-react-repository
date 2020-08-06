import React from 'react';
import styles from './SubmitField.module.css'
import StatusErrors from './StatusErrors';
import Button from './Button';

const SubmitField = () => {
  return (
    <div className={styles.submitField}>
      <StatusErrors />
      <Button type='submit'>Sign in</Button>
    </div>
  );
};

export default SubmitField;
