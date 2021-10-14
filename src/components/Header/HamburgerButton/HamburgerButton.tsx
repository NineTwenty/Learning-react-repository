import Button from 'components/common/Button';
import React from 'react';
import { Icon } from 'components/common/Icon/Icon';

interface HamburgerButtonProps
  extends React.ComponentPropsWithRef<typeof Button> {
  isOpen: boolean;
  iconType: 'arrows' | 'hamburger';
}

const component = React.forwardRef<HTMLButtonElement, HamburgerButtonProps>(
  (
    {
      className,
      isOpen,
      onClick,
      children,
      iconType = 'hamburger',
      styleType,
    }: HamburgerButtonProps,
    ref
  ) => {
    const iconsSets = {
      arrows: {
        closed: 'chevronRight',
        open: 'chevronLeft',
      },
      hamburger: {
        closed: 'menu',
        open: 'menuOpen',
      },
    };

    // Choose icon to show
    const icon = isOpen ? iconsSets[iconType].open : iconsSets[iconType].closed;

    const iconColor = styleType ? 'black' : 'white';

    return (
      <Button
        className={className}
        onClick={onClick}
        type='button'
        aria-label='hamburger button'
        styleType={styleType}
        aria-expanded={isOpen}
        ref={ref}
      >
        <Icon type={icon} color={iconColor} />
        {children}
      </Button>
    );
  }
);

// Workaround to save name in devtools & named import
component.displayName = 'HamburgerButton';

export const HamburgerButton = component;
