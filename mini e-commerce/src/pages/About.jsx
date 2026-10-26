import { Link } from 'react-router-dom'

const values = [
  {
    icon: '🔎',
    title: 'Chosen slowly',
    text: 'Every item is tested by our small team for at least a month before it reaches the shop.',
  },
  {
    icon: '🧾',
    title: 'Honest pricing',
    text: 'No permanent “sales”, no inflated list prices. You see the real cost of a well-made thing.',
  },
  {
    icon: '📦',
    title: 'Less packaging',
    text: 'Orders ship in recycled, plastic-free boxes that are sized to the product, not the other way around.',
  },
]

export default function About() {
  return (
    <div className="page">
      <section className="page-header about-header">
        <div className="container about-header-inner">
          <div>
            <p className="eyebrow">Our story</p>
            <h1>A small shop for the things you keep.</h1>
            <p className="page-header-text">
              Marketly started in a one-bedroom apartment with a simple question: what if a shop
              stocked only ten things, and every one of them was worth owning?
            </p>
            <Link className="btn btn-outline" to="/">
              ← Back to home
            </Link>
          </div>
          <div className="about-collage" aria-hidden="true">
            <img src="/products/halo-lamp.svg" alt="" />
            <img src="/products/terra-mug.svg" alt="" />
            <img src="/products/alpine-backpack.svg" alt="" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-story">
          <div>
            <p className="eyebrow">Why we exist</p>
            <h2>Buy fewer, choose better.</h2>
          </div>
          <div className="about-story-text">
            <p>
              The average home has more objects than it has places to put them. We built Marketly
              as a counterweight: a catalogue small enough to know by heart, curated around audio,
              tech, homeware and the things you carry every day.
            </p>
            <p>
              We are not trying to be the biggest store. We are trying to be the one you check
              first when you actually need something — and the one you trust to say “you probably
              don’t need this” when you don’t.
            </p>
            <p>
              Every product page is written by the person who tested it. If something does not
              survive a month of real use, it does not get a listing. It really is that simple.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="values-grid">
            {values.map((value) => (
              <article className="value-card" key={value.title}>
                <span className="value-icon" aria-hidden="true">
                  {value.icon}
                </span>
                <h2>{value.title}</h2>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-stats">
            <div>
              <strong>2021</strong>
              <span>Year we opened</span>
            </div>
            <div>
              <strong>10</strong>
              <span>Products, on purpose</span>
            </div>
            <div>
              <strong>1.8k</strong>
              <span>Orders shipped</span>
            </div>
            <div>
              <strong>98%</strong>
              <span>Would buy again</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="story-banner about-cta">
            <div className="story-banner-copy">
              <p className="eyebrow eyebrow-light">Have a look around</p>
              <h2>The shelf is waiting.</h2>
              <p>Ten products, each with a reason to be there. Start with the best sellers.</p>
              <div className="hero-actions">
                <Link className="btn btn-light" to="/products">
                  Shop the collection
                </Link>
                <Link className="btn btn-ghost-light" to="/cart">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
