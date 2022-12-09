import { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import RequireAuth from 'components/RequireAuth';
import Header from 'components/Header/Header';
import Navbar from 'components/Navbar/Navbar';
import { CurrentUserProvider } from 'utils/contexts/current-user-context';

export default function Page() {
  // Navbar control
  const [isSideNavForceOpen, setSideNavForceOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <RequireAuth>
      <CurrentUserProvider>
        <div>
          <Header
            menuBtnRef={menuBtnRef}
            isSideNavForceOpen={isSideNavForceOpen}
            setSideNavForceOpen={setSideNavForceOpen}
          />
          <Navbar
            menuBtnRef={menuBtnRef}
            isSideNavForceOpen={isSideNavForceOpen}
            setSideNavForceOpen={setSideNavForceOpen}
          />
          <div>
            <Outlet />
          </div>
        </div>
      </CurrentUserProvider>
    </RequireAuth>
  );
}
