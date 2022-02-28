import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';

type Props = {
  isSideNavForceOpen: boolean;
  setSideNavForceOpen: (state: boolean) => void;
  menuBtnRef: React.RefObject<HTMLButtonElement>;
};

export function Navbar({
  isSideNavForceOpen,
  setSideNavForceOpen,
  menuBtnRef,
}: Props) {
  const isOpen = isSideNavForceOpen ? style.isOpen : '';

  const selfRef = useRef<HTMLElement>(null);

  // Close on click outside navbar
  useEffect(() => {
    const menuBtn = menuBtnRef.current;

    // Click event handler
    const closeOnOutsideClick = ({ target }: MouseEvent) => {
      if (!target) return;
      // Check if it's not the toggle button
      if (menuBtn && !menuBtn.contains(target as Element)) {
        // Check if navbar is open & target is part of navbar
        if (
          isSideNavForceOpen &&
          selfRef.current &&
          !selfRef.current.contains(target as Element)
        ) {
          // Close navbar
          setSideNavForceOpen(false);
        }
      }
    };

    window.addEventListener('click', closeOnOutsideClick);

    return () => window.removeEventListener('click', closeOnOutsideClick);
  }, [isSideNavForceOpen, setSideNavForceOpen, menuBtnRef]);

  // Render
  return (
    <nav ref={selfRef} className={`${style.nav} ${isOpen}`}>
      <NavLink
        to='/dialogs'
        className={style.navLink}
        activeClassName={style.active}
      >
        Dialogs
      </NavLink>
      <NavLink
        to='/profile'
        className={style.navLink}
        activeClassName={style.active}
      >
        Profile
      </NavLink>
      <NavLink
        to='/news'
        className={style.navLink}
        activeClassName={style.active}
      >
        News
      </NavLink>
      <NavLink
        to='/music'
        className={style.navLink}
        activeClassName={style.active}
      >
        Music
      </NavLink>
      <NavLink
        to='/settings'
        className={style.navLink}
        activeClassName={style.active}
      >
        Settings
      </NavLink>
    </nav>
  );
}
