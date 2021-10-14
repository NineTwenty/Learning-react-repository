import { Field } from 'formik';
import style from './TextAreaField.module.css';

interface TextAreaFieldProps {
  children?: React.ReactNode;
  className?: string;
  name: string;
  value: string;
  rows: string;
  cols: string;
  onKeyPress: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
}

export const TextAreaField = ({
  children,
  className,
  name,
  value,
  rows,
  cols,
  onKeyPress,
  disabled,
}: TextAreaFieldProps) => {
  return (
    <Field
      as='textarea'
      className={`${style.textArea} ${className ?? ''}`}
      {...{ name, rows, cols, value, onKeyPress, disabled }}
    >
      {children}
    </Field>
  );
};
