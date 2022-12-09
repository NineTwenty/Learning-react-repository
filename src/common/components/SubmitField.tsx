import styles from './SubmitField.module.css';
import StatusErrors from './StatusErrors';
import Button from './Button';

type Props = {
  buttonText: string;
  isSubmiting?: boolean;
};

function SubmitField(props: Props) {
  const { buttonText, isSubmiting } = props;
  return (
    <div className={styles.submitField}>
      <StatusErrors />
      <Button
        disabled={isSubmiting}
        className={styles.SubmitButton}
        type='submit'
      >
        {buttonText}
      </Button>
    </div>
  );
}

export default SubmitField;
