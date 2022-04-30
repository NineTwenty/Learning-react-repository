import cx from 'classnames';
import { MdClose } from 'react-icons/md';
import styles from './Dialog.module.scss';
import { Wrapper } from '../Wrapper/Wrapper';
import { Portal } from '../Portal/Portal';
import Button from '../Button';

interface DialogProps extends React.ComponentPropsWithoutRef<'div'> {
  onClose: () => void;
}

export function Dialog({ onClose, className, children }: DialogProps) {
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
