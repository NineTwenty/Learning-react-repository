import style from './Separator.module.css';

export function Separator({ className = '' }) {
  return <hr className={`${style.separator} ${className}`.trim()} />;
}
