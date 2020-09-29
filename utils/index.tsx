import { Paginated } from '@next-storefront/core/types'

export function groupByKey<T extends Record<K, string[]>, K extends keyof T>(
  array: T[],
  key: K,
): Record<string, T[]> {
  return array.reduce((group, product) => {
    for (let tag of product[key]) {
      if (group[tag]) {
        group[tag].push(product)
      } else {
        group[tag] = [product]
      }
    }

    return group
  }, {})
}

export function paginate<T>(array: T[], itemsPerPage): Paginated<T>[] {
  let totalPages = Math.ceil(array.length / itemsPerPage)

  let pages = Array.from(Array(totalPages)).map((_, i) => ({
    count: array.length,
    pageNum: i + 1,
    results: array.slice(i * itemsPerPage, (i + 1) * itemsPerPage),
  }))

  return pages
}
