# Marketly — Mini E-Commerce Store

A small React store built with Vite, React Router DOM, and Redux Toolkit.

## Run it

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Pages

| Route | Description |
| --- | --- |
| `/` | Welcome banner with links to Products and Cart |
| `/products` | 10 products with search and category filters |
| `/cart` | Quantities, remove, clear, totals and checkout |
| `/about` | Store information with a link back home |
| `/checkout` | Delivery form and order summary |
| `/order-confirmed` | Order confirmation (redirects here after checkout) |
| `*` | Custom 404 page |

## Redux Toolkit

The cart lives in `src/features/cart/cartSlice.js`:

- `addToCart`
- `removeFromCart`
- `increaseQuantity`
- `decreaseQuantity`
- `clearCart`

The store is configured in `src/app/store.js` with `configureStore()`. Cart state is saved to and restored from `localStorage` automatically.

## Project structure

```
src/
  app/store.js
  components/Navbar.jsx, ProductCard.jsx, Toast.jsx
  features/cart/cartSlice.js
  features/products/productsData.js
  pages/Home.jsx, Products.jsx, Cart.jsx, About.jsx,
        Checkout.jsx, OrderConfirmed.jsx, NotFound.jsx
  App.jsx
  main.jsx
  index.css
public/products/   product images (SVG)
```
