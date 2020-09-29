import { GetStaticProps, GetStaticPaths } from 'next'
import { getProductPage, getProductPages } from '@next-storefront/core/adapter'

export const getStaticProps: GetStaticProps = async ({
  params: { pageNum },
}) => {
  let page = await getProductPage(+pageNum)

  return {
    props: {
      page,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let pages = await getProductPages()

  return {
    paths: pages.map(({ pageNum }) => ({
      params: { pageNum: String(pageNum) },
    })),
    fallback: true,
  }
}

export { IndexPage as default } from 'src/components/IndexPage'
