import style from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={style.spinnerWrapper}>
      <div className={style.spinner} />
    </div>
  );
};
