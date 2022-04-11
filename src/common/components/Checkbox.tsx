import { Field } from 'formik';
import styles from './Checkbox.module.css';

interface CheckBoxFieldProps {
  name: string;
  label: string;
}

function CheckboxField({ name, label }: CheckBoxFieldProps) {
  return (
    <div>
      <label className={styles.label}>
        <Field className={styles.checkInput} name={name} type='checkbox' />
        <span className={styles.checkBox} />
        {label}
      </label>
    </div>
  );
}

export default CheckboxField;
