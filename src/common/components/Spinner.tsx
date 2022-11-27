import style from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={style.spinnerWrapper}>
      <div className={style.spinner} />
    </div>
  );
}
