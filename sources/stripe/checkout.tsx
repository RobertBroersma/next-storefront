import { CartItem } from '@next-storefront/core/types'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export async function goToCheckout(items: CartItem[]) {
  const stripe = await stripePromise

  const response = await fetch('/api/createCheckout', {
    method: 'POST',
    body: JSON.stringify({ items }),
  })

  const session = await response.json()

  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  })

  if (result.error) {
    throw new Error('Something went wrong')
  }
}
