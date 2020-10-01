import { CartProvider } from '@next-storefront/core/contexts/CartContext'
import { useCart } from '@next-storefront/core/hooks/useCart'
import * as shopifyCheckout from '@next-storefront/shopify/cart'
import { ShoppingCart } from 'react-feather'
import { Link } from 'src/components/Link'
import NextLink from 'next/link'

import 'index.css'
import 'pure-react-carousel/dist/react-carousel.es.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

function Cart() {
  let { cart } = useCart()

  return (
    <Link href="/shop/cart" className="flex items-center">
      <ShoppingCart />
      <span className="font-semibold text-xl px-3">
        {cart.reduce((total, item) => total + item.quantity, 0)}
      </span>
    </Link>
  )
}

function Menu() {
  return (
    <header className="text-gray-700 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NextLink href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl">Next Storefront</span>
          </a>
        </NextLink>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href="/shop">Shop</Link>
        </nav>
        <Cart />
      </div>
    </header>
  )
}

export default function AppRoot({ Component, pageProps }) {
  return (
    <CartProvider checkout={shopifyCheckout}>
      <Menu />

      <Component {...pageProps} />
    </CartProvider>
  )
}
