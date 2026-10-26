import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import Toast from '../components/Toast.jsx'
import { CATEGORIES, products } from '../features/products/productsData.js'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [toast, setToast] = useState(null)

  const category = CATEGORIES.includes(searchParams.get('category'))
    ? searchParams.get('category')
    : 'All'
  const query = searchParams.get('q') ?? ''

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'All') {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    setSearchParams(next, { replace: true })
  }

  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesSearch =
        needle.length === 0 ||
        product.name.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle) ||
        product.category.toLowerCase().includes(needle)
      return matchesCategory && matchesSearch
    })
  }, [category, query])

  const hasFilters = category !== 'All' || query.trim().length > 0

  const resetFilters = () => setSearchParams({}, { replace: true })

  return (
    <div className="page">
      <section className="page-header">
        <div className="container">
          <p className="eyebrow">The collection</p>
          <h1>Everything on the shelf</h1>
          <p className="page-header-text">
            Ten things we genuinely use. Filter by category or search the catalogue.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="toolbar">
            <label className="search-field">
              <span className="visually-hidden">Search products</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => updateParam('q', event.target.value)}
                placeholder="Search products…"
                autoComplete="off"
              />
            </label>

            <div className="filter-chips" role="group" aria-label="Filter by category">
              {CATEGORIES.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`chip${category === option ? ' is-active' : ''}`}
                  aria-pressed={category === option}
                  onClick={() => updateParam('category', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="results-row">
            <p className="results-count" aria-live="polite">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              {category !== 'All' && <span> in {category}</span>}
              {query.trim() && <span> matching “{query.trim()}”</span>}
            </p>
            {hasFilters && (
              <button className="link-button" type="button" onClick={resetFilters}>
                Clear filters
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdded={(added) =>
                    setToast({ id: Date.now(), message: `${added.name} added to your cart.` })
                  }
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">
                🔍
              </span>
              <h2>No products found</h2>
              <p>Try a different search term or browse another category.</p>
              <button className="btn btn-primary" type="button" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  )
}
