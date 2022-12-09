import { Field, ErrorMessage } from 'formik';
import style from './TextField.module.css';

interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
}

function TextField({
  name,
  label,
  type = 'text',
  placeholder,
}: TextFieldProps) {
  return (
    <div className={style.wrapper}>
      <label className={style.label}>
        {label}
        <div className={style.field}>
          <Field name={name} type={type || 'text'} placeholder={placeholder} />
          <span className={style.error}>
            <ErrorMessage name={name} />
          </span>
        </div>
      </label>
    </div>
  );
}

export default TextField;
