import Button from 'common/components/Button';
import HamburgerButton from 'common/components/HamburgerButton';
import { useAppDispatch } from 'utils/hooks/hooks';
import { logout } from 'data/common/actions';
import { MdLogout } from 'react-icons/md';
import styles from './Header.module.css';

type Props = {
  isSideNavForceOpen: boolean;
  setSideNavForceOpen: (value: boolean) => void;
  menuBtnRef: React.RefObject<HTMLButtonElement>;
};

function Header({
  isSideNavForceOpen,
  setSideNavForceOpen,
  menuBtnRef,
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>
        <span>R</span>RP
      </h1>
      <HamburgerButton
        ref={menuBtnRef}
        styleType='borderless'
        isOpen={isSideNavForceOpen}
        onClick={() => setSideNavForceOpen(!isSideNavForceOpen)}
      >
        Menu
      </HamburgerButton>
      <Button
        className={styles.logoutButton}
        styleType='borderless'
        onClick={() => {
          dispatch(logout());
        }}
      >
        <MdLogout /> Logout
      </Button>
    </header>
  );
}

export default Header;
