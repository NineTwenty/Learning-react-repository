import style from './Tabs.module.css';

type Props = {
  children: React.ReactNode;
};

export default function Tabs({ children }: Props) {
  return <div className={style.tabs}>{children}</div>;
}
