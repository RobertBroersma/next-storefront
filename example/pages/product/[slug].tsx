import { getProducts, getProductBySlug } from '@next-storefront/core/adapter'

export async function getStaticProps({ params: { slug } }) {
  let product = await getProductBySlug(slug)

  return {
    props: {
      product,
    },
  }
}

export async function getStaticPaths() {
  let allProducts = await getProducts()

  return {
    paths: allProducts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}

export { ProductPage as default } from 'src/components/ProductPage'
