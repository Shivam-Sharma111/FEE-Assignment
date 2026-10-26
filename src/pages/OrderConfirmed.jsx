import { Link, useLocation } from 'react-router-dom'
import { formatPrice } from '../features/products/productsData.js'

function formatDeliveryWindow(placedAt) {
  const start = new Date(placedAt)
  const end = new Date(placedAt)
  start.setDate(start.getDate() + 3)
  end.setDate(end.getDate() + 5)
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
  return `${formatter.format(start)} – ${formatter.format(end)}`
}

export default function OrderConfirmed() {
  const { state } = useLocation()
  const order = state?.order

  if (!order) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state empty-cart">
            <span className="empty-icon empty-icon-large" aria-hidden="true">
              📦
            </span>
            <h1>No order to show</h1>
            <p>This page appears after you place an order. Your cart is waiting when you are ready.</p>
            <div className="empty-actions">
              <Link className="btn btn-primary" to="/products">
                Browse products
              </Link>
              <Link className="btn btn-outline" to="/">
                Back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="section">
        <div className="container confirmation">
          <div className="confirmation-head">
            <span className="success-mark" aria-hidden="true">
              ✓
            </span>
            <p className="eyebrow">Order placed</p>
            <h1>Thank you, {order.customer.name.split(' ')[0] || 'friend'}!</h1>
            <p className="confirmation-lede">
              Your order <strong>{order.id}</strong> is confirmed. A receipt is on its way to{' '}
              <strong>{order.customer.email}</strong>.
            </p>
            <p className="delivery-window">
              Estimated delivery <strong>{formatDeliveryWindow(order.placedAt)}</strong>
            </p>
          </div>

          <div className="confirmation-grid">
            <div className="confirmation-card">
              <h2>Order details</h2>
              <ul className="summary-items">
                {order.items.map((item) => (
                  <li key={item.id}>
                    <div className="summary-item-image">
                      <img src={item.image} alt="" />
                      <span className="summary-qty">{item.quantity}</span>
                    </div>
                    <div className="summary-item-info">
                      <p>{item.name}</p>
                      <span>{formatPrice(item.price)} each</span>
                    </div>
                    <span className="summary-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="summary-divider" />

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {order.shipping === 0 ? (
                    <span className="free-tag">Free</span>
                  ) : (
                    formatPrice(order.shipping)
                  )}
                </span>
              </div>
              <div className="summary-row summary-total">
                <span>Total paid</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="confirmation-side">
              <div className="confirmation-card">
                <h2>Shipping to</h2>
                <address className="confirmation-address">
                  {order.customer.name}
                  <br />
                  {order.customer.address}
                  <br />
                  {order.customer.city} {order.customer.zip}
                  <br />
                  {order.customer.email}
                </address>
              </div>

              <div className="confirmation-card">
                <h2>Payment</h2>
                <p className="confirmation-muted">{order.payment}</p>
                <p className="confirmation-note">
                  This is a demo order. No payment was processed and nothing will be shipped.
                </p>
              </div>

              <Link className="btn btn-primary btn-block" to="/products">
                Continue shopping
              </Link>
              <Link className="btn btn-outline btn-block" to="/">
                Back home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
