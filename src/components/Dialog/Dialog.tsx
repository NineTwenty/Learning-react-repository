import cx from 'classnames';
import { MdClose } from 'react-icons/md';
import Wrapper from 'components/Wrapper/Wrapper';
import Portal from 'components/Portal/Portal';
import Button from 'components/Button';
import styles from './Dialog.module.scss';

interface DialogProps extends React.ComponentPropsWithoutRef<'div'> {
  onClose: () => void;
}

export default function Dialog({ onClose, className, children }: DialogProps) {
  const classes = cx(styles.Wrapper, className);

  return (
    <Portal>
      <Wrapper className={classes}>
        <Button
          onClick={onClose}
          className={styles.Button}
          styleType='borderless'
        >
          <MdClose />
        </Button>
        {children}
      </Wrapper>
    </Portal>
  );
}
