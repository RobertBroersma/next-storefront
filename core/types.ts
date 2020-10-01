export interface Image {
  altText: string
  src: string
}

export interface ProductOption {
  name: string
  values: string[]
  position: number
}

export interface Product {
  id: string
  createdAt: string
  updatedAt: string
  totalInventory: number
  name: string
  vendor: string
  images: Image[]
  slug: string
  description: string
  tags: string[]
  variants: Variant[]
  options: ProductOption[]
}

export interface Variant {
  id: string
  sku: string
  name: string
  price: PriceType
  image: Image
}

export interface PriceType {
  amount: number
  currencyCode: string
}

export interface CartItem {
  product: Product
  variantId: string
  quantity: number
}

export interface Paginated<T> {
  count: number
  pageNum: number
  results: T[]
}

export interface Source {
  fetchProducts(): Promise<Product[]>
  fetchProductBySlug(slug: string): Promise<Product>
}

export interface Config {
  sources: Source[]
}
