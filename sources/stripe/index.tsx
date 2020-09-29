import { GraphQLClient, gql } from 'graphql-request'
import { Product } from '@next-storefront/core/types'

const client = new GraphQLClient(
  'https://statikly.myshopify.com/api/2020-07/graphql',
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': 'c4b01a3a7e7a2fff03ae48390375abf4',
      Accept: 'application/json',
    },
  },
)

const query = gql`
  query allProducts($itemsPerPage: Int!, $after: String) {
    products(first: $itemsPerPage, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          handle
          title
        }
      }
    }
  }
`

export default async function fetchProducts(): Promise<Product[]> {
  console.info('Fetching Stripe Products')

  return []

  // return [
  //   {
  //     id: 'vegan-chickn-tikka',
  //     name: 'Vegan Chickn Tikka',
  //     images: [
  //       {
  //         src: 'https://picsum.photos/200/300',
  //         altText: 'Vegan Chickn Tikka',
  //       },
  //     ],
  //     slug: 'vegan-chickn-tikka',
  //     description: 'Vegan Chickn Tikka',
  //     tags: ['vegan', 'chickn-tikka'],
  //     variants: [
  //       {
  //         id: 'vegan-chickn-tikka',
  //         sku: 'vegan-chickn-tikka',
  //         name: 'Vegan Chickn Tikka',
  //         price: {
  //           amount: 12,
  //           currencyCode: 'EUR',
  //         },
  //         image: {
  //           src: 'https://picsum.photos/200/300',
  //           altText: 'Vegan Chickn Tikka',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     id: 'vegan-butter-chickn',
  //     name: 'Vegan Butter Chickn',
  //     images: [
  //       {
  //         src: 'https://picsum.photos/200/300',
  //         altText: 'Vegan Butter Chickn',
  //       },
  //     ],
  //     slug: 'vegan-butter-chickn',
  //     description: 'Vegan Butter Chickn',
  //     tags: ['vegan', 'butter-chickn'],
  //     variants: [
  //       {
  //         id: 'vegan-butter-chickn',
  //         sku: 'vegan-butter-chickn',
  //         name: 'Vegan Butter Chickn',
  //         price: {
  //           amount: 13,
  //           currencyCode: 'EUR',
  //         },
  //         image: {
  //           src: 'https://picsum.photos/200/300',
  //           altText: 'Vegan Chickn Tikka',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     id: 'vegan-paneer',
  //     name: 'Vegan Paneer',
  //     images: [
  //       {
  //         src: 'https://picsum.photos/200/300',
  //         altText: 'Vegan Paneer',
  //       },
  //     ],
  //     slug: 'vegan-paneer',
  //     description: 'Vegan Paneer',
  //     tags: ['vegan', 'paneer'],
  //     variants: [
  //       {
  //         id: 'vegan-paneer',
  //         sku: 'vegan-paneer',
  //         name: 'Vegan Paneer',
  //         price: {
  //           amount: 8,
  //           currencyCode: 'EUR',
  //         },
  //         image: {
  //           src: 'https://picsum.photos/200/300',
  //           altText: 'Vegan Chickn Tikka',
  //         },
  //       },
  //     ],
  //   },
  // ]
}
