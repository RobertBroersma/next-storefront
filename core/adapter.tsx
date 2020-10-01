import { groupByKey, paginate } from '@next-storefront/utils'
import dayjs from 'dayjs'
import { Config, Paginated } from './types'
import { Product } from './types'

let itemsPerPage = process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || 9

let { sources }: Config = require('~/next-storefront.config.js')

export async function getProducts(): Promise<Product[]> {
  let productPromises: Promise<Product[]>[] = sources.map(
    async ({ fetchProducts }) => {
      return fetchProducts()
    },
  )

  let allProducts = await Promise.all(productPromises)

  return allProducts.flat()
}

export async function getProductPages() {
  let allProducts = [...(await getProducts())].sort((a, b) =>
    dayjs(b.createdAt).diff(a.createdAt, 'millisecond'),
  )
  let allPages = paginate(allProducts, itemsPerPage)

  return allPages
}

export async function getProductPage(pageNum: number) {
  let allPages = await getProductPages()

  return allPages[pageNum - 1]
}

export async function getProductBySlug(slug: string) {
  // TODO: Find better way than checking all sources
  let product = sources
    .map(source => source.fetchProductBySlug(slug))
    .filter(Boolean)[0]

  return product
}

export async function getTagPages() {
  let allProducts = await getProducts()
  let groupedProducts = groupByKey(allProducts, 'tags')

  let paginatedGroupedProducts = Object.entries(groupedProducts).reduce<
    Record<string, Paginated<Product>[]>
  >((acc, [tag, products]) => {
    acc[tag] = paginate(products, itemsPerPage)
    return acc
  }, {})

  return paginatedGroupedProducts
}

export async function getTagPage(tag: string, pageNum: number) {
  let allTagPages = await getTagPages()

  return allTagPages[tag][pageNum - 1]
}
