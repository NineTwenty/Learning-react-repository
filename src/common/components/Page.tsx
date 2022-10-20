import { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { RequireAuth } from 'app/RequireAuth';
import Header from 'common/components/Header/Header';
import { Navbar } from 'common/components/Navbar/Navbar';
import { CurrentUserProvider } from 'common/contexts/current-user-context';

export function Page() {
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