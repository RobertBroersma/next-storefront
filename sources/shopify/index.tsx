import { GraphQLClient, gql } from 'graphql-request'
import fs from 'fs-extra'

import { Product } from '@next-storefront/core/types'
import path from 'path'

// TODO: Invalidate cache
// TODO: Error Handling

const client = new GraphQLClient(
  'https://statikly.myshopify.com/api/2020-07/graphql',
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': 'c4b01a3a7e7a2fff03ae48390375abf4',
      Accept: 'application/json',
    },
  },
)

const PRODUCTS_QUERY = gql`
  query products($after: String, $first: Int = 250) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          createdAt
          updatedAt
          totalInventory
          handle
          title
          vendor
          description
          tags

          options(first: 250) {
            name
            values
            # position
          }

          images(first: 250) {
            edges {
              node {
                altText
                transformedSrc
              }
            }
          }

          variants(first: 250) {
            edges {
              node {
                id
                sku
                title
                priceV2 {
                  amount
                  currencyCode
                }
                image {
                  altText
                  transformedSrc
                }
              }
            }
          }
        }
      }
    }
  }
`

const PRODUCT_BY_HANDLE_QUERY = gql`
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      createdAt
      updatedAt
      handle
      title
      vendor
      description
      tags
      totalInventory

      options(first: 250) {
        name
        values
        # position
      }

      images(first: 250) {
        edges {
          node {
            altText
            transformedSrc
          }
        }
      }

      variants(first: 250) {
        edges {
          node {
            id
            sku
            title
            priceV2 {
              amount
              currencyCode
            }
            image {
              altText
              transformedSrc
            }
          }
        }
      }
    }
  }
`

async function fetchProductBySlugFromShopify(handle: string): Promise<Product> {
  console.info(`Fetching Shopify Product with handle: ${handle}`)

  let { productByHandle } = await client.request(PRODUCT_BY_HANDLE_QUERY, {
    handle,
  })

  let product: Product = {
    id: productByHandle.id,
    createdAt: productByHandle.createdAt,
    updatedAt: productByHandle.updatedAt,
    totalInventory: productByHandle.totalInventory,
    name: productByHandle.title,
    vendor: productByHandle.vendor,
    images: productByHandle.images.edges.map(({ node: image }) => ({
      altText: image.altText,
      src: image.transformedSrc,
    })),
    options: productByHandle.options,
    slug: productByHandle.handle,
    description: productByHandle.description,
    tags: productByHandle.tags,
    variants: productByHandle.variants.edges.map(({ node: variant }) => ({
      id: variant.id,
      sku: variant.sku,
      name: variant.title,
      price: {
        amount: +variant.priceV2.amount,
        currencyCode: variant.priceV2.currencyCode,
      },
      image: {
        altText: variant.image.altText,
        src: variant.image.transformedSrc,
      },
    })),
  }

  return product
}

async function fetchProductsFromShopify(): Promise<Product[]> {
  console.info('Fetching Shopify Products')

  let allProducts: Product[] = []

  let hasNextPage = true
  let after

  while (hasNextPage) {
    let { products } = await client.request(PRODUCTS_QUERY, { after })

    if (products.length <= 0) break

    let { length, [length - 1]: last } = products.edges

    allProducts = [
      ...allProducts,
      ...products.edges.map(
        ({ node }): Product => ({
          id: node.id,
          createdAt: node.createdAt,
          updatedAt: node.updatedAt,
          totalInventory: node.totalInventory,
          name: node.title,
          vendor: node.vendor,
          images: node.images.edges.map(({ node: image }) => ({
            altText: image.altText,
            src: image.transformedSrc,
          })),
          options: node.options,
          slug: node.handle,
          description: node.description,
          tags: node.tags,
          variants: node.variants.edges.map(({ node: variant }) => ({
            id: variant.id,
            sku: variant.sku,
            name: variant.title,
            price: {
              amount: +variant.priceV2.amount,
              currencyCode: variant.priceV2.currencyCode,
            },
            image: {
              altText: variant.image.altText,
              src: variant.image.transformedSrc,
            },
          })),
        }),
      ),
    ]

    after = last.cursor
    hasNextPage = products.pageInfo.hasNextPage
  }

  return allProducts
}

const PRODUCT_CACHE = `.statik/shop/shopify/products`

// fetch all products from cache or Shopify
export async function fetchProducts(): Promise<Product[]> {
  await fs.ensureDir(PRODUCT_CACHE)

  let files = await fs.readdir(PRODUCT_CACHE)

  if (files.length <= 0) {
    let allProducts = await fetchProductsFromShopify()
    await Promise.all(
      allProducts.map(product =>
        fs.outputJson(`${PRODUCT_CACHE}/${product.slug}.json`, product),
      ),
    )

    return allProducts
  }

  return Promise.all(
    files
      .map(file => `${PRODUCT_CACHE}/${file}`)
      .map(filename => fs.readJson(filename)),
  )
}

// fetch product by handle from cache or Shopify
export async function fetchProductBySlug(slug: string): Promise<Product> {
  await fs.ensureDir(PRODUCT_CACHE)

  let filePath = path.resolve(PRODUCT_CACHE, `${slug}.json`)

  // No caching on production.
  // TODO: Invalidate cache after build and after timeout, and then use cache even in production
  if (!filePath || process.env.NODE_ENV === 'production') {
    console.log(`GETTING ${slug} FROM SHOPIFY`)
    let product = await fetchProductBySlugFromShopify(slug)

    // No need to write in prod
    if (process.env.NODE_ENV !== 'production') {
      await fs.outputJson(`${PRODUCT_CACHE}/${product.slug}.json`, product)
    }

    return product
  }

  return fs.readJson(filePath)
}
