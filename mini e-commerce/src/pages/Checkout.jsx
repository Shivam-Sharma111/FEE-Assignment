import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  clearCart,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
} from '../features/cart/cartSlice.js'
import { formatPrice } from '../features/products/productsData.js'

const FREE_SHIPPING_THRESHOLD = 100
const SHIPPING_FEE = 6

const initialForm = {
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  payment: 'card',
}

export default function Checkout() {
  const items = useSelector(selectCartItems)
  const itemCount = useSelector(selectCartCount)
  const subtotal = useSelector(selectCartSubtotal)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (items.length === 0) return

    const order = {
      id: `MK-${Date.now().toString(36).toUpperCase()}`,
      placedAt: new Date().toISOString(),
      items: items.map((item) => ({ ...item })),
      itemCount,
      subtotal,
      shipping,
      total,
      customer: {
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        zip: form.zip.trim(),
      },
      payment: form.payment === 'card' ? 'Demo card' : 'Cash on delivery',
    }

    dispatch(clearCart())
    navigate('/order-confirmed', { state: { order }, replace: true })
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state empty-cart">
            <span className="empty-icon empty-icon-large" aria-hidden="true">
              🧾
            </span>
            <h1>There is nothing to check out</h1>
            <p>Your cart is empty. Add a product first and come back here.</p>
            <Link className="btn btn-primary btn-lg" to="/products">
              Browse products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="page-header page-header-compact">
        <div className="container">
          <ol className="checkout-steps" aria-label="Checkout progress">
            <li className="is-done">Cart</li>
            <li className="is-current" aria-current="step">
              Details
            </li>
            <li>Confirmation</li>
          </ol>
          <h1>Checkout</h1>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="form-section-heading">
                <h2>Delivery details</h2>
                <p>Where should we send your order?</p>
              </div>

              <div className="field-grid">
                <label className="field field-wide">
                  <span>Full name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Alex Morgan"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="field field-wide">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="field field-wide">
                  <span>Street address</span>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="24 Willow Street, Apt 3"
                    autoComplete="street-address"
                    required
                  />
                </label>

                <label className="field">
                  <span>City</span>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Portland"
                    autoComplete="address-level2"
                    required
                  />
                </label>

                <label className="field">
                  <span>ZIP / postal code</span>
                  <input
                    type="text"
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    placeholder="97205"
                    autoComplete="postal-code"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-heading">
                <h2>Payment</h2>
                <p>This is a demo store — no real payment is taken.</p>
              </div>

              <div className="payment-options">
                <label className={`payment-option${form.payment === 'card' ? ' is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={form.payment === 'card'}
                    onChange={handleChange}
                  />
                  <span>
                    <strong>Card (demo)</strong>
                    <small>Use any details — nothing is charged.</small>
                  </span>
                  <span className="payment-mark" aria-hidden="true">
                    💳
                  </span>
                </label>

                <label className={`payment-option${form.payment === 'cod' ? ' is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.payment === 'cod'}
                    onChange={handleChange}
                  />
                  <span>
                    <strong>Cash on delivery</strong>
                    <small>Pay when your parcel arrives.</small>
                  </span>
                  <span className="payment-mark" aria-hidden="true">
                    📦
                  </span>
                </label>
              </div>
            </div>

            <button className="btn btn-primary btn-block btn-lg" type="submit">
              Place order · {formatPrice(total)}
            </button>
            <p className="checkout-back">
              <Link className="text-link" to="/cart">
                ← Back to cart
              </Link>
            </p>
          </form>

          <aside className="summary-card checkout-summary" aria-label="Order summary">
            <h2>
              Order summary <span className="summary-count">{itemCount}</span>
            </h2>

            <ul className="summary-items">
              {items.map((item) => (
                <li key={item.id}>
                  <div className="summary-item-image">
                    <img src={item.image} alt="" />
                    <span className="summary-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-item-info">
                    <p>{item.name}</p>
                    <span>{item.category}</span>
                  </div>
                  <span className="summary-item-price">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="free-tag">Free</span> : formatPrice(shipping)}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
