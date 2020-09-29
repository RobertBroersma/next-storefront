import { Paginated } from '@next-storefront/core/types'
import Link from 'next/link'

interface TagsPageProps {
  tags: {
    tag: string
    pageCount: number
  }[]
}

export function TagsPage({ tags }: TagsPageProps) {
  return (
    <div className="container mx-auto pt-8 px-8">
      <ul className="grid grid-cols-4 gap-4">
        {tags.map(({ tag, pageCount }) => (
          <li key={tag} className="block">
            <Link href={`/tag/${tag}`}>
              <a className="font-bold tracking-widest uppercase bg-indigo-500 text-white rounded-lg px-4 h-24 flex justify-center items-center text-center hover:bg-indigo-600">
                <span>
                  {tag}{' '}
                  <span className="text-xs font-normal">
                    ({pageCount} products)
                  </span>
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
