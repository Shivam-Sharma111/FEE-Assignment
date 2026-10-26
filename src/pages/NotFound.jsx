import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <div className="not-found">
          <p className="not-found-code" aria-hidden="true">
            404
          </p>
          <p className="eyebrow">Page not found</p>
          <h1>This shelf is empty.</h1>
          <p className="not-found-text">
            The page you are looking for does not exist, was moved, or maybe never made it off the
            drawing board.
          </p>
          <div className="empty-actions">
            <Link className="btn btn-primary btn-lg" to="/">
              Back to home
            </Link>
            <Link className="btn btn-outline btn-lg" to="/products">
              Browse products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
