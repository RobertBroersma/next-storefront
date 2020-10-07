import { CartItem } from '@next-storefront/core/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { getProducts } from '@next-storefront/core/adapter'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

interface StripeLineItem {
  price_data: {
    currency: string
    product_data: {
      name: string
    }
    unit_amount: number
  }
  quantity: number
}

export default async function createCheckout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    let allProducts = await getProducts()

    let cart: CartItem[] = JSON.parse(req.body).items

    // Get products from actual data to make sure users didn't mess with it.
    let lineItems: StripeLineItem[] = cart.map(item => {
      let product = allProducts.find(p => p.id === item.product.id)
      let variant = product.variants.find(v => v.id === item.variantId)

      return {
        price_data: {
          currency: variant.price.currencyCode,
          unit_amount: variant.price.amount * 100,
          product_data: {
            name: Array.from(new Set([product.name, variant.name])).join(' - '),
          },
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/cancel`,
    })

    res.status(200).json({ id: session.id })
  }

  res.status(404)
}
