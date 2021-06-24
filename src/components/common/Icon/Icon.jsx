import React from 'react';
import styles from './Icon.module.scss';

const reqIcons = require.context('images', true, /\.svg$/);

export const Icon = ({ color = 'black', type, className }) => {
  const iconsEnum = {
    black: {
      chevronLeft: reqIcons('./chevron_left_black.svg').default,
      chevronRight: reqIcons('./chevron_right_black.svg').default,
      menu: reqIcons('./menu_black.svg').default,
      menuOpen: reqIcons('./menu_open_black.svg').default,
    },
    white: {
      chevronLeft: reqIcons('./chevron_left_white.svg').default,
      chevronRight: reqIcons('./chevron_right_white.svg').default,
      menu: reqIcons('./menu_white.svg').default,
      menuOpen: reqIcons('./menu_open_white.svg').default,
    },
  };

  const icon = iconsEnum[color][type];

  return <img className={`${styles.Icon} ${className}`} src={icon} alt='' aria-hidden={true} />;
};
