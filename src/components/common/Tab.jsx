import { NavLink } from 'react-router-dom';
import style from './Tab.module.css';

export const Tab = ({ value, route }) => {
  return (
    <NavLink to={route} className={style.link} activeClassName={style.active}>
      {value}
    </NavLink>
  );
};
