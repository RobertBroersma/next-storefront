import { GetStaticProps } from 'next'
import { getTagPages } from '@next-storefront/core/adapter'

export const getStaticProps: GetStaticProps = async () => {
  let pages = await getTagPages()

  return {
    props: {
      tags: Object.entries(pages).map(([tag, page]) => ({
        tag,
        pageCount: page[0].count,
      })),
    },
  }
}

export { TagsPage as default } from 'src/components/TagsPage'
