import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

/**
 * Cart item shape:
 * { id, name, price, image, category, quantity }
 *
 * Keeping a snapshot of the product details in the cart means the cart does not
 * need the product catalogue to render, and it also makes localStorage
 * persistence straightforward.
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      if (!product?.id) return
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1,
        })
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    increaseQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (item) item.quantity += 1
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (!item) return
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        // Decreasing the last unit removes the item from the cart.
        state.items = state.items.filter((entry) => entry.id !== action.payload)
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export const selectCartItems = (state) => state.cart.items

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

export const selectQuantityById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id)?.quantity ?? 0

export default cartSlice.reducer
