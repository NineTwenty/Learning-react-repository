import Button from 'components/common/Button';
import React from 'react';
import styles from './HamburgerButton.module.css';

const component = (
  { isOpen, onClick, children, iconType = 'hamburger', ...rest },
  ref
) => {
  const iconsSets = {
    arrows: {
      close: '<',
      open: '>',
    },
    hamburger: {
      close: '☰',
      open: '☰',
    },
  };

  // Choose icon to show
  const icon = isOpen ? iconsSets[iconType].close : iconsSets[iconType].open;

  return (
    <Button
      onClick={onClick}
      type='button'
      aria-label={'hamburger button'}
      aria-expanded={isOpen}
      ref={ref}
      {...rest}
    >
      <span
        aria-hidden='true'
        className={`${styles['hamburgerButton_Icon']} 
          ${children ? styles['hamburgerButton_Icon_withMargin'] : ''}`}
      >
        {icon}
      </span>
      {children}
    </Button>
  );
};

// Workaround to save name in devtools & named import
component.displayName = 'HamburgerButton';

export const HamburgerButton = React.forwardRef(component);
