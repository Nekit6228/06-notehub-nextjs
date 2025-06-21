'use client';

import css from '../error.module.css';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorMessage({ error, reset }: ErrorProps) {
  return (
    <div className={css.error}>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset} className={css.button}>
        Try again
      </button>
    </div>
  );
}