import fs from 'fs-extra'
import path from 'path'
import { Product } from '@next-storefront/core/types'

// TODO: Error Handling

const PRODUCT_DIR = 'products'

export async function fetchProducts(): Promise<Product[]> {
  await fs.ensureDir(PRODUCT_DIR)

  let files = await fs.readdir(PRODUCT_DIR)

  if (files.length <= 0) {
    return []
  }

  return Promise.all(
    files.map(filename => fs.readJson(`${PRODUCT_DIR}/${filename}`)),
  )
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  await fs.ensureDir(PRODUCT_DIR)

  let filePath = path.join(PRODUCT_DIR, `${slug}.json`)

  if (!filePath) {
    return null
  }

  try {
    return await fs.readJson(filePath)
  } catch (e) {
    return null
  }
}
