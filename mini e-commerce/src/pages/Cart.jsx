import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
} from '../features/cart/cartSlice.js'
import { formatPrice } from '../features/products/productsData.js'

const FREE_SHIPPING_THRESHOLD = 100
const SHIPPING_FEE = 6

export default function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const itemCount = useSelector(selectCartCount)
  const subtotal = useSelector(selectCartSubtotal)

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  const handleClear = () => {
    if (window.confirm('Remove every item from your cart?')) {
      dispatch(clearCart())
    }
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state empty-cart">
            <span className="empty-icon empty-icon-large" aria-hidden="true">
              🛍️
            </span>
            <p className="eyebrow">Your cart is empty</p>
            <h1>Nothing here yet</h1>
            <p>Once you add something you love, it will show up here.</p>
            <Link className="btn btn-primary btn-lg" to="/products">
              Start shopping
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
          <p className="eyebrow">Your cart</p>
          <div className="cart-title-row">
            <h1>Shopping cart</h1>
            <span className="count-pill">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container cart-layout">
          <div className="cart-list">
            <div className="cart-list-head" aria-hidden="true">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            <ul className="cart-items">
              {items.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div className="cart-item-product">
                    <img className="cart-item-image" src={item.image} alt={item.name} />
                    <div>
                      <p className="cart-item-category">{item.category}</p>
                      <h2 className="cart-item-name">{item.name}</h2>
                      <p className="cart-item-unit">{formatPrice(item.price)} each</p>
                      <button
                        className="remove-button"
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="qty-stepper" aria-label={`Quantity for ${item.name}`}>
                    <button
                      type="button"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      aria-label={
                        item.quantity === 1
                          ? `Remove ${item.name} from cart`
                          : `Decrease quantity of ${item.name}`
                      }
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item-total">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>

            <div className="cart-list-actions">
              <Link className="text-link" to="/products">
                ← Continue shopping
              </Link>
              <button className="link-button danger" type="button" onClick={handleClear}>
                Clear cart
              </button>
            </div>
          </div>

          <aside className="summary-card" aria-label="Order summary">
            <h2>Order summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="free-tag">Free</span> : formatPrice(shipping)}</span>
            </div>

            {amountToFreeShipping > 0 ? (
              <p className="shipping-note">
                Add <strong>{formatPrice(amountToFreeShipping)}</strong> more for free shipping.
              </p>
            ) : (
              <p className="shipping-note shipping-note-good">
                ✓ Your order qualifies for free shipping.
              </p>
            )}

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="summary-caption">Taxes calculated at checkout.</p>

            <button
              className="btn btn-primary btn-block btn-lg"
              type="button"
              onClick={() => navigate('/checkout')}
            >
              Proceed to checkout
            </button>

            <div className="summary-trust">
              <span aria-hidden="true">🔒</span> Secure demo checkout
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
