import { createContext, useContext, useState, useEffect } from 'react'
import { cartApi } from '../api'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) fetchCart()
    else setCart({ items: [], total: 0, itemCount: 0 })
  }, [user])

  const fetchCart = async () => {
    try {
      const res = await cartApi.getCart(user.id)
      setCart(res.data)
    } catch {}
  }

  const addToCart = async (productId, quantity = 1) => {
    if (!user) { toast.error('Please login to add items'); return }
    setLoading(true)
    try {
      const res = await cartApi.addItem(user.id, { productId, quantity })
      setCart(res.data)
      toast.success('Added to cart!')
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to add item')
    } finally { setLoading(false) }
  }

  const updateItem = async (itemId, quantity) => {
    setLoading(true)
    try {
      const res = await cartApi.updateItem(user.id, itemId, { quantity })
      setCart(res.data)
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to update')
    } finally { setLoading(false) }
  }

  const removeItem = async (itemId) => {
    setLoading(true)
    try {
      const res = await cartApi.removeItem(user.id, itemId)
      setCart(res.data)
      toast.success('Item removed')
    } catch {} finally { setLoading(false) }
  }

  const clearCart = async () => {
    try {
      await cartApi.clearCart(user.id)
      setCart({ items: [], total: 0, itemCount: 0 })
    } catch {}
  }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateItem, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
