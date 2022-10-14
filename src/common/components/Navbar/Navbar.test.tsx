import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { render, screen } from 'utils/test-utils';
import { Navbar } from './Navbar';

const renderNavbar = ({
  btnRef = createRef<HTMLButtonElement>(),
  setSideNavForceOpen = jest.fn(),
  children = (
    <Navbar
      isSideNavForceOpen
      setSideNavForceOpen={setSideNavForceOpen}
      menuBtnRef={btnRef}
    />
  ),
} = {}) => {
  return render(children);
};

it('Change location on link click', async () => {
  renderNavbar();
  expect(window.location.pathname).toBe('/');

  const navBtn = screen.getByRole('link', { name: /profile/i });
  userEvent.click(navBtn);

  expect(window.location.pathname).toBe('/profile');
});

it('Turn off forced open on click outside', () => {
  const btnRef = createRef<HTMLButtonElement>();
  const setForceOpen = jest.fn();
  renderNavbar({
    children: (
      <div>
        <button type='button' ref={btnRef}>
          menu
        </button>
        <Navbar
          isSideNavForceOpen
          setSideNavForceOpen={setForceOpen}
          menuBtnRef={btnRef}
        />
        <div>outside</div>
      </div>
    ),
  });

  // Click on associated menu button shouldn't trigger callback
  // cause they suppose to change same state
  userEvent.click(screen.getByRole('button', { name: 'menu' }));
  expect(setForceOpen).not.toBeCalled();

  userEvent.click(screen.getByText('outside'));
  expect(setForceOpen).toBeCalledWith(false);
});
