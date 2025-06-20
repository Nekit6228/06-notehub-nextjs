'use client';
import css from './error.module.css';

interface ErrorOverlayProps {
  message?: string;
  onRetry?: () => void;
}

export default function Error({ message = "Something went wrong.", onRetry }: ErrorOverlayProps) {
  return (
    <div className={css.overlay}>
      <div className={css.errorBox}>
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className={css.retryButton}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
}