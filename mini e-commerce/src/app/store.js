import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice.js'

export const CART_STORAGE_KEY = 'marketly.cart.v1'

const isValidItem = (item) =>
  item &&
  typeof item.id === 'string' &&
  typeof item.name === 'string' &&
  Number.isFinite(item.price) &&
  typeof item.image === 'string' &&
  Number.isInteger(item.quantity) &&
  item.quantity > 0

/** Read a previously saved cart, ignoring anything malformed. */
export function loadCartState() {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw)
    const items = Array.isArray(parsed?.items) ? parsed.items.filter(isValidItem) : []
    if (items.length === 0) return undefined
    return { cart: { items } }
  } catch {
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadCartState(),
})

// Persist the cart whenever its items change. Tracking the previous items
// reference keeps unrelated updates from writing to localStorage.
let previousItems = store.getState().cart.items

store.subscribe(() => {
  const items = store.getState().cart.items
  if (items === previousItems) return
  previousItems = items
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items }))
  } catch {
    // Storage can be full or disabled — the app still works in memory.
  }
})
