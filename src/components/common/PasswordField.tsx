import TextField from './TextField';

interface PasswordFieldProps {
  name: string;
  label: string;
  placeholder: string;
}

function PasswordField({ name, label, placeholder }: PasswordFieldProps) {
  return <TextField type='password' {...{ name, label, placeholder }} />;
}

export default PasswordField;
