import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectQuantityById } from '../features/cart/cartSlice.js'
import { formatPrice } from '../features/products/productsData.js'

export default function ProductCard({ product, onAdded }) {
  const dispatch = useDispatch()
  const quantityInCart = useSelector(selectQuantityById(product.id))

  const handleAdd = () => {
    dispatch(addToCart(product))
    onAdded?.(product)
  }

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {quantityInCart > 0 && (
          <span className="in-cart-pill" aria-label={`${quantityInCart} in cart`}>
            {quantityInCart} in cart
          </span>
        )}
      </div>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-rating" aria-label={`Rated ${product.rating} out of 5`}>
            ★ {product.rating.toFixed(1)}
            <span className="review-count">({product.reviews})</span>
          </span>
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button className="btn btn-add" type="button" onClick={handleAdd}>
            <span aria-hidden="true">+</span> Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
