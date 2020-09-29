import { GraphQLClient, gql } from 'graphql-request'
import fs from 'fs-extra'

import { Product } from '@next-storefront/core/types'

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
  query productByHandle($handle: String) {
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
      tracksInventory

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
          createdAt: new Date(node.createdAt),
          updatedAt: new Date(node.updatedAt),
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

const PRODUCT_CACHE = `${process.cwd()}/.statik/shop/shopify/products`

// fetchProductsFromCacheOrShopify
export async function fetchProducts(): Promise<Product[]> {
  await fs.ensureDir(PRODUCT_CACHE)

  let files = await fs.readdir(PRODUCT_CACHE)

  if (files.length <= 0) {
    let allProducts = await fetchProductsFromShopify()
    await Promise.all(
      allProducts.map(product =>
        fs.outputJson(`${PRODUCT_CACHE}/${product.id}.json`, product),
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
