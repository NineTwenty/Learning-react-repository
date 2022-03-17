import styles from './SubmitField.module.css';
import StatusErrors from './StatusErrors';
import Button from './Button';

type Props = {
  buttonText: string;
};

function SubmitField(props: Props) {
  const { buttonText } = props;
  return (
    <div className={styles.submitField}>
      <StatusErrors />
      <Button className={styles.SubmitButton} type='submit'>
        {buttonText}
      </Button>
    </div>
  );
}

export default SubmitField;
