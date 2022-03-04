import styles from './Header.module.css';
import { HamburgerButton } from './HamburgerButton';

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
    </header>
  );
}

export default Header;
