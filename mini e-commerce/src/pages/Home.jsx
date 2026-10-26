import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import Toast from '../components/Toast.jsx'
import { products } from '../features/products/productsData.js'

const featured = products.slice(0, 3)

const perks = [
  { icon: '🚚', title: 'Free shipping', text: 'On every order over $100.' },
  { icon: '↩️', title: 'Easy returns', text: '30 days to change your mind.' },
  { icon: '🌱', title: 'Made to last', text: 'Chosen for quality, not hype.' },
]

export default function Home() {
  const [toast, setToast] = useState(null)

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              Small shop, big care
            </p>
            <h1>
              Everyday goods,
              <br />
              <em>well made.</em>
            </h1>
            <p className="hero-text">
              A considered collection of audio, tech and homeware — the pieces you reach for every
              day, chosen to last longer than the trend cycle.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to="/products">
                Shop all products
                <span aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-outline btn-lg" to="/cart">
                View cart
              </Link>
            </div>
            <div className="hero-proof">
              <span className="avatar-stack" aria-hidden="true">
                <span>J</span>
                <span>A</span>
                <span>M</span>
              </span>
              <p>
                <strong>4.8 average</strong> from 1,800+ happy customers
              </p>
            </div>
          </div>

          <div className="hero-art" aria-label="Featured products">
            <div className="hero-art-main">
              <img
                src="/products/aurora-headphones.svg"
                alt="Aurora wireless headphones"
                width="600"
                height="600"
              />
            </div>
            <div className="hero-art-small hero-art-one">
              <img src="/products/halo-lamp.svg" alt="Halo desk lamp" width="600" height="600" />
            </div>
            <div className="hero-art-small hero-art-two">
              <img src="/products/terra-mug.svg" alt="Terra ceramic mug" width="600" height="600" />
            </div>
            <div className="hero-float-card">
              <span className="hero-float-star" aria-hidden="true">
                ★
              </span>
              <div>
                <p className="hero-float-title">Staff pick</p>
                <p className="hero-float-sub">Halo Desk Lamp · $54</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="perks">
        <div className="container perks-grid">
          {perks.map((perk) => (
            <div className="perk" key={perk.title}>
              <span className="perk-icon" aria-hidden="true">
                {perk.icon}
              </span>
              <div>
                <h2>{perk.title}</h2>
                <p>{perk.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The short list</p>
              <h2>A few favourites</h2>
            </div>
            <Link className="text-link" to="/products">
              Browse everything <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdded={(added) =>
                  setToast({ id: Date.now(), message: `${added.name} added to your cart.` })
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="story-banner">
            <div className="story-banner-copy">
              <p className="eyebrow eyebrow-light">Why Marketly</p>
              <h2>Fewer things. Better things.</h2>
              <p>
                We stock a small catalogue on purpose. Every product is tested by our team for at
                least a month before it earns a place on the shelf.
              </p>
              <Link className="btn btn-light" to="/about">
                Read our story
              </Link>
            </div>
            <div className="story-banner-stats" aria-label="Store statistics">
              <div>
                <strong>10</strong>
                <span>considered products</span>
              </div>
              <div>
                <strong>1.8k</strong>
                <span>orders shipped</span>
              </div>
              <div>
                <strong>98%</strong>
                <span>would buy again</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  )
}
