import style from './Separator.module.css';

type Props = {
  className?: string;
};

export default function Separator({ className = '' }: Props) {
  return <hr className={`${style.separator} ${className}`.trim()} />;
}
