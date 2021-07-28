import Button from 'components/common/Button';
import React from 'react';
import { Icon } from 'components/common/Icon/Icon';

const component = (
  {
    isOpen,
    onClick,
    children,
    iconType = 'hamburger',
    styleType,
    ...rest
  },
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
      onClick={onClick}
      type='button'
      aria-label={'hamburger button'}
      styleType={styleType}
      aria-expanded={isOpen}
      ref={ref}
      {...rest}
    >
      <Icon type={icon} color={iconColor} />
      {children}
    </Button>
  );
};

// Workaround to save name in devtools & named import
component.displayName = 'HamburgerButton';

export const HamburgerButton = React.forwardRef(component);
