# 🚧 This code is under construction

# Next Storefront

An dazzlingly fast E-Commerce solution built with Typescript and NextJS.

# Demo

Visit the demo here: INSERT DEMO LINK

> 📝 This demo will be updated regularly as cool new features are rolled out!

## Features:

- [x] Static Generation
- [x] Eeasy serverless deploy with Vercel or Netlify
- [x] Use with Shopify
- [ ] Use with Stripe Products
- [ ] Use with other sources

## Roadmap

- [x] 1. Work with SSG
- [ ] 2. Work with Incremental Static (Re)generation
- [ ] 3. Work with live-updates for things like inventory

## Config

```js
// next-storefront.config.js

module.exports = {
  sources: [require('@next-storefront/shopify')],
}
```

## Usage

Clone `/example` (jk for now you have the clone the entire repo as I'm haven't taken the time to publish the packages yet.)

Install dependencies

```
yarn
```

or

```
npm install
```

Set environment variables:  
`NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=woohoobigtoken`  
`NEXT_PUBLIC_SHOPIFY_STORE_NAME=statikly` (as in statikly.myshopify.com)

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
