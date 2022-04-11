import { useFormikContext } from 'formik';
import styles from './StatusErrors.module.css';

function StatusErrors() {
  // Get form status from context
  const { status } = useFormikContext();
  // Take errors if there any
  const formErrors = (status && status.formErrors) || '';
  // Map them to list items
  const errorsList = formErrors
    ? formErrors.map((err) => <li key={err}>{err}</li>)
    : '';

  return <ul className={styles.errors}>{errorsList}</ul>;
}

export default StatusErrors;
