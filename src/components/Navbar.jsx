import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../features/cart/cartSlice.js'

const navLinkClass = ({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')

export default function Navbar() {
  const cartCount = useSelector(selectCartCount)

  return (
    <>
      <div className="announcement">
        <span>Free shipping on orders over $100</span>
        <span className="announcement-dot" aria-hidden="true">
          •
        </span>
        <span>30-day returns, no questions asked</span>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" to="/" aria-label="Marketly home">
            <span className="brand-mark" aria-hidden="true">
              M
            </span>
            <span className="brand-name">Marketly</span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </nav>

          <NavLink to="/cart" className={({ isActive }) => `cart-link${isActive ? ' is-active' : ''}`}>
            <svg
              className="cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.5L21 8H6" />
              <circle cx="10" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </header>
    </>
  )
}
