import Button from 'common/components/Button';
import React from 'react';
import {
  MdMenuOpen,
  MdMenu,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import styles from './HamburgerButton.module.css';

interface HamburgerButtonProps
  extends React.ComponentPropsWithRef<typeof Button> {
  isOpen: boolean;
  iconType?: 'arrows' | 'hamburger';
}

const component = React.forwardRef<HTMLButtonElement, HamburgerButtonProps>(
  (
    {
      /* eslint-disable react/prop-types */
      // False positive
      // eslint-plugin-react #3140
      className,
      isOpen,
      onClick,
      children,
      iconType = 'hamburger',
      styleType,
    }: HamburgerButtonProps,
    ref
  ) => {
    const iconColor = styleType ? styles.iconBlack : styles.iconWhite;
    const iconsSets = {
      arrows: {
        closed: <MdChevronRight className={iconColor} />,
        open: <MdChevronLeft className={iconColor} />,
      },
      hamburger: {
        closed: <MdMenu className={iconColor} />,
        open: <MdMenuOpen className={iconColor} />,
      },
    };

    // // Choose icon to show
    const icon = isOpen ? iconsSets[iconType].open : iconsSets[iconType].closed;

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
        {icon}
        {children}
      </Button>
    );
  }
);

// Workaround to save name in devtools & named import
component.displayName = 'HamburgerButton';
const HamburgerButton = component;

export default HamburgerButton;
