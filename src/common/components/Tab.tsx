import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import style from './Tab.module.css';

type Props = {
  value: string;
  route: string;
};

export function Tab({ value, route }: Props) {
  const handleClassName = ({ isActive }: { isActive: boolean }) =>
    cx([style.link, { [style.active]: isActive }]);
  return (
    <NavLink to={route} className={handleClassName}>
      {value}
    </NavLink>
  );
}
