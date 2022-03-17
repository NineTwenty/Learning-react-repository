import { ReactComponent as chevronLeftBlack } from 'images/chevron_left_black.svg';
import { ReactComponent as chevronRightBlack } from 'images/chevron_right_black.svg';
import { ReactComponent as menuBlack } from 'images/menu_black.svg';
import { ReactComponent as menuOpenBlack } from 'images/menu_open_black.svg';
import { ReactComponent as chevronLeftWhite } from 'images/chevron_left_white.svg';
import { ReactComponent as chevronRightWhite } from 'images/chevron_right_white.svg';
import { ReactComponent as menuWhite } from 'images/menu_white.svg';
import { ReactComponent as menuOpenWhite } from 'images/menu_open_white.svg';
import { ReactComponent as closeBlack } from 'images/close_black.svg';
import { ReactComponent as closeWhite } from 'images/close_white.svg';
import styles from './Icon.module.scss';

export function Icon({ color = 'black', type, className = '' }) {
  const iconsEnum = {
    black: {
      chevronLeft: chevronLeftBlack,
      chevronRight: chevronRightBlack,
      menu: menuBlack,
      menuOpen: menuOpenBlack,
      close: closeBlack,
    },
    white: {
      chevronLeft: chevronLeftWhite,
      chevronRight: chevronRightWhite,
      menu: menuWhite,
      menuOpen: menuOpenWhite,
      close: closeWhite,
    },
  };

  const IconSvg = iconsEnum[color][type];

  return (
    <IconSvg title='' className={`${styles.Icon} ${className}`} aria-hidden />
  );
}
