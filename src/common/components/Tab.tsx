import { NavLink } from 'react-router-dom';
import style from './Tab.module.css';

type Props = {
  value: string;
  route: string;
};

export function Tab({ value, route }: Props) {
  return (
    <NavLink to={route} className={style.link} activeClassName={style.active}>
      {value}
    </NavLink>
  );
}
