import style from './Tabs.module.css';

export function Tabs({ children }) {
  return <div className={style.tabs}>{children}</div>;
}
