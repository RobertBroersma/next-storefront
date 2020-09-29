import { CartItem } from '@next-storefront/core/types'
import Client from 'shopify-buy'

let client = Client.buildClient({
  domain: `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
})

export function goToCheckout(items: CartItem[]) {
  client.checkout.create().then(checkout => {
    client.checkout
      .addLineItems(
        checkout.id,
        items.map(item => ({
          variantId: item.product.variants.find(
            variant => variant.id === item.variantId,
          ).id,
          quantity: item.quantity,
        })),
      )
      .then(checkout => {
        // TODO: Figure out why type doesn't work because the code does work lol
        // @ts-ignore
        window.location.assign(checkout.webUrl)
      })
  })
}
