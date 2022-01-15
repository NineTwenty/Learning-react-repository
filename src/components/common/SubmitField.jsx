import styles from './SubmitField.module.css';
import StatusErrors from './StatusErrors';
import Button from './Button';

function SubmitField(props) {
  const { buttonText } = props;
  return (
    <div className={styles.submitField}>
      <StatusErrors />
      <Button type='submit'>{buttonText}</Button>
    </div>
  );
}

export default SubmitField;
