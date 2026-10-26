import { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 3000)
    return () => window.clearTimeout(timer)
  }, [onClose])

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">
        ✓
      </span>
      <p>{message}</p>
      <button className="toast-close" type="button" onClick={onClose} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  )
}
