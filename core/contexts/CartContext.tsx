import { createContext, useState, useCallback, useEffect, useMemo } from 'react'
import { goToCheckout as goToShopifyCheckout } from '@next-storefront/shopify/cart'
import { CartItem, PriceType } from '../types'

interface CartContextValue {
  cart: CartItem[]
  itemCount: number
  totalPrice: PriceType
  addToCart(newCartItem: CartItem): void
  removeFromCart(variantId: string, quantity: number): void
  clearCart(): void
  goToCheckout(): void
}

export let CartContext = createContext<CartContextValue>({
  cart: [],
  itemCount: 0,
  totalPrice: {
    amount: 0,
    currencyCode: 'EUR',
  },
  addToCart() {},
  removeFromCart() {},
  clearCart() {},
  goToCheckout() {},
})

export function CartProvider({ children }) {
  let [cart, updateCart] = useState<CartItem[]>([])

  let addToCart = useCallback((newItem: CartItem) => {
    updateCart(currentCart =>
      currentCart.find(item => item.variantId === newItem.variantId)
        ? currentCart.map(item =>
            item.variantId === newItem.variantId
              ? {
                  product: item.product,
                  variantId: item.variantId,
                  quantity: item.quantity + newItem.quantity,
                }
              : item,
          )
        : [...currentCart, { ...newItem, quantity: newItem.quantity || 1 }],
    )
  }, [])

  let removeFromCart = useCallback((variantId: string, quantity: number) => {
    updateCart(currentCart => {
      let item = currentCart.find(item => item.variantId === variantId)

      if (!item) {
        return currentCart
      }

      if (item.quantity <= quantity) {
        return currentCart.filter(item => item.variantId !== variantId)
      }

      return currentCart.map(item =>
        item.variantId === variantId
          ? {
              product: item.product,
              variantId: item.variantId,
              quantity: item.quantity - quantity,
            }
          : item,
      )
    })
  }, [])

  let clearCart = useCallback(() => {
    updateCart([])
  }, [])

  useEffect(() => {
    updateCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  let goToCheckout = useCallback(() => {
    goToShopifyCheckout(cart)
  }, [cart])

  let totalPrice: PriceType = useMemo(
    () => ({
      currencyCode: cart[0]?.product.variants[0].price.currencyCode,
      amount: cart.reduce((total, item) => {
        return (
          total +
          item.product.variants.find(variant => variant.id === item.variantId)
            .price.amount *
            item.quantity
        )
      }, 0),
    }),
    [cart],
  )

  let itemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        goToCheckout,
        totalPrice,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
