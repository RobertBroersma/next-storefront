<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://raw.githubusercontent.com/RobertBroersma/next-storefront/main/logo.svg" alt="Project logo"></a>
</p>

<h3 align="center">Next Storefront</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/RobertBroersma/funk.svg)](https://github.com/RobertBroersma/funk/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/RobertBroersma/funk.svg)](https://github.com/RobertBroersma/funk/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A dazzlingly fast E-Commerce solution built with Typescript and NextJS.
    <br> 
</p>

<a href="https://discord.gg/KZmJGPF" >
  <img width="200" src="https://i.imgur.com/En8vQRC.png)" />
 </a>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [TODO](#todo)

## 🧐 About <a name = "about"></a>



Visit the demo here: https://next-storefront-statik.vercel.app/

> 📝 This demo will be updated regularly as cool new features are rolled out!

## 🏁 Getting Started <a name = "getting_started"></a>

### Installing

Firstly, install `@next-storefront/core`. This package contains an adapter to pull in and transform data from different data sources. It also contains contexts and hooks.

```
npm install @next-storefront/core --save
```

Or

```
yarn add @next-storefront/core
```

## 🎈 Usage <a name="usage"></a>

Secondly, pick one or more data sources, and a checkout system.

### Use with Shopify

When working with Shopify, Shopify acts as both the source of products and the checkout.

1. Install `@next-storefront/shopify`
2. Configure Shopify as a source:

```js
// next-storefront.config.js

module.exports = {
  sources: [require('@next-storefront/shopify')],
}
```

3. Configure Shopify Checkout:
```tsx
// App layout

import { CartProvider } from '@next-storefront/core'
import * as shopifyCheckout from '@next-storefront/shopify/checkout'

export function Layout({ Component, pageProps }) {
  return (
    <CartProvider checkout={shopifyCheckout}>
      ...
    </CartProvider>
  )
}

```

Get a Shopify _storefront_ api access token. The best way is to [create a private app](https://shopify.dev/docs/storefront-api/getting-started#private).

Set environment variables:  
`NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=woohoobigtoken`  
`NEXT_PUBLIC_SHOPIFY_STORE_NAME=statikly` (as in statikly.myshopify.com)

### Use With Stripe

When working with Stripe, Stripe Checkout acts as the checkout. You can pull in product data from anywhere! (Even Shopify)
1. Install any data source, e.g. `@next-storefront/json`
2. Configure your data source:

```js
// next-storefront.config.js

module.exports = {
  sources: [require('@next-storefront/json')],
}
```

3. Install `@next-storefront/stripe`
4. Configure Stripe Checkout:

```tsx
// App layout

import { CartProvider } from '@next-storefront/core'
import * as stripeCheckout from '@next-storefront/stripe/checkout'

export function Layout({ Component, pageProps }) {
  return (
    <CartProvider checkout={stripeCheckout}>
      ...
    </CartProvider>
  )
}

```

Set environment variables:  
`STRIPE_SECRET_KEY`  
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Create some products by adding `.json` files to the `products` directory.

## ⛏️ Built Using <a name = "built_using"></a>
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment


## 🎉 Acknowledgements <a name = "acknowledgement"></a>
- Hat tip to anyone whose code was used
- Inspiration
- References

## TODO Features (in no particular order):

- [x] Static Generation
- [x] Serverless deploy with Vercel or Netlify
- [x] Work with SSG
- [x] Work with Incremental Static (Re)generation
- [ ] Work with live-updates for things like inventory
- [x] Use with Shopify
- [x] Use with Stripe Checkout (This paves the way for retrieving products from anywhere!)
- [ ] Use with Stripe Products
- [ ] Use with other sources
- [ ] Wishlists
- [ ] Search & Filters
- [ ] Custom Checkout
- [ ] Order Pages
- [ ] PWA

## Roadmap
