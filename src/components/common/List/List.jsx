import React from 'react';
import style from './List.module.css';
import { Wrapper } from '../Wrapper/Wrapper';

export const List = ({ children }) => {
  // Wrap children elements in li tag
  const listElements = React.Children.map(children, (el) => (
    <li key={el.props.id}>{el}</li>
  ));

  return (
    <Wrapper className={style.wrapper}>
      <ul className={style.list}>{listElements}</ul>
    </Wrapper>
  );
};
