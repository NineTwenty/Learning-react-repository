import { Field } from 'formik';
import style from './TextAreaField.module.css';

interface TextAreaFieldProps {
  name: string;
  className?: string;
  rows?: string;
  cols?: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export const TextAreaField = ({
  className,
  name,
  rows,
  cols,
  onKeyPress,
  disabled,
}: TextAreaFieldProps) => {
  return (
    <Field
      as='textarea'
      className={`${style.textArea} ${className ?? ''}`}
      {...{
        name,
        rows,
        cols,
        onKeyPress,
        disabled,
      }}
    />
  );
};
