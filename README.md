<a href="https://discord.gg/KZmJGPF" >
  <img width="200" src="https://i.imgur.com/En8vQRC.png)" />
 </a>

# 🚧 This code is under construction

# Next Storefront

A dazzlingly fast E-Commerce solution built with Typescript and NextJS.

# Demo

Visit the demo here: https://next-storefront-statik.vercel.app/

> 📝 This demo will be updated regularly as cool new features are rolled out!

## TODO Features (in no particular order):

- [x] Static Generation
- [x] Serverless deploy with Vercel or Netlify
- [x] Use with Shopify
- [x] Use with Stripe Checkout (This paves the way for retrieving products from anywhere!)
- [ ] Use with Stripe Products
- [ ] Use with other sources
- [ ] Wishlists
- [ ] Search & Filters
- [ ] Custom Checkout
- [ ] Order Pages

## Roadmap

- [x] 1. Work with SSG
- [x] 2. Work with Incremental Static (Re)generation
- [ ] 3. Work with live-updates for things like inventory

## Config

```js
// next-storefront.config.js

module.exports = {
  sources: [require('@next-storefront/shopify')],
}
```

## Usage

If you'd like to try it out yourself, clone the entire repo, cd into `/example` and then:

Install dependencies

```
yarn
```

or

```
npm install
```

Run Development:

```
yarn dev
```

or

```
npm run dev
```

Run Production:

```
yarn build
yarn start
```

or

```
npm run build
npm start
```

### Use with Shopify

Get a Shopify _storefront_ api access token. The best way is to [create a private app](https://shopify.dev/docs/storefront-api/getting-started#private).

Set environment variables:  
`NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=woohoobigtoken`  
`NEXT_PUBLIC_SHOPIFY_STORE_NAME=statikly` (as in statikly.myshopify.com)

### Use With Stripe

Set environment variables:  
`STRIPE_SECRET_KEY`
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Create some products by adding `.json` files to the `products` directory.
