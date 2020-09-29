import { GetStaticProps, GetStaticPaths } from 'next'
import { getTagPages, getTagPage } from '@next-storefront/core/adapter'

export const getStaticProps: GetStaticProps = async ({
  params: { tag, pageNum },
}: {
  params: { tag: string; pageNum: string }
}) => {
  let page = await getTagPage(tag, +pageNum)

  return {
    props: {
      page,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let allPages = await getTagPages()

  return {
    paths: Object.entries(allPages).flatMap(([tag, page]) =>
      page.map(({ pageNum }) => ({
        params: { tag, pageNum: String(pageNum) },
      })),
    ),
    fallback: false,
  }
}

export { IndexPage as default } from 'src/components/IndexPage'
