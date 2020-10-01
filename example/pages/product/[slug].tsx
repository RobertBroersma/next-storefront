import { getProducts, getProductBySlug } from '@next-storefront/core/adapter'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  let product = await getProductBySlug(slug)

  return {
    props: {
      product,
    },
    revalidate: 60,
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
