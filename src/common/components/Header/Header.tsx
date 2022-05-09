import Button from 'common/components/Button';
import { HamburgerButton } from 'common/components/HamburgerButton';
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
  return (
    <header className={styles.header}>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbqUkyAK84IcDm7zcaea_O8vPEYDDhEyZ-DR5wV_oqccAu65Zd&usqp=CAU'
        alt='logo'
      />
      <HamburgerButton
        ref={menuBtnRef}
        styleType='borderless'
        isOpen={isSideNavForceOpen}
        onClick={() => setSideNavForceOpen(!isSideNavForceOpen)}
      >
        Menu
      </HamburgerButton>
      <Button className={styles.logoutButton} styleType='borderless'>
        <MdLogout /> Logout
      </Button>
    </header>
  );
}

export default Header;
