import css from './loader.module.css'

export default function Loader() {
  return (
    <div className={css.overlay}>
      <div className={css.loader}>Loading...</div>
    </div>
  );
}
