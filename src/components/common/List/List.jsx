import React from 'react';
import style from './List.module.css';

export const List = ({ children }) => {
  // Wrap children elements in li tag
  const listElements = React.Children.map(children, (el) => (
    <li key={el.props.id}>{el}</li>
  ));

  return (
    <div className={style.wrapper}>
      <ul className={style.list}>{listElements}</ul>
    </div>
  );
};
