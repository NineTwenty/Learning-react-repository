import React from 'react';
import Wrapper from 'components/Wrapper/Wrapper';
import style from './List.module.css';

type Props = {
  children: React.ReactElement<{ id: number | string }>[];
};

export default function List({ children }: Props) {
  // Wrap children elements in li tag
  const listElements = React.Children.map(children, (el) => (
    <li className={style.listItem} key={el.props.id}>
      {el}
    </li>
  ));

  return (
    <Wrapper className={style.wrapper}>
      <ul className={style.list}>{listElements}</ul>
    </Wrapper>
  );
}
