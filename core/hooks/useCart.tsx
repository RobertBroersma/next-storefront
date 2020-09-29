import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

export function useCart() {
  return useContext(CartContext)
}
