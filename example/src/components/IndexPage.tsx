import Link from 'next/link'
import { Product, Paginated } from '@next-storefront/core/types'
import { Price } from 'src/components/atoms/Price'
import { Pagination } from 'src/components/Pagination'
import { useRouter } from 'next/router'
import { ChevronRight } from 'react-feather'

interface IndexPageProps {
  title?: string
  page: Paginated<Product>
}

export function IndexPage({ page }: IndexPageProps) {
  let { query, route } = useRouter()

  if (!page) {
    console.log('PAGE NOT GENERATED', route, query)
    return <>Something went wrong</>
  }

  return (
    <section className="text-gray-700 body-font">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {page.results.map(product => (
          <Link key={product.id} href={`/product/${product.slug}`}>
            <a>
              <div className="bg-white h-full rounded-lg flex flex-col">
                <div className="flex flex-col p-8">
                  <div className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt={product.images[0].altText}
                      className="object-contain object-center w-full h-full block"
                      src={product.images[0].src}
                    />
                  </div>
                  <div className="pt-8 flex justify-between">
                    <div className="flex-1 mr-3">
                      <h2 className="text-gray-900 title-font text-sm font-bold capitalize">
                        {product.name}
                      </h2>
                      <span className="pt-1 text-xs text-gray-500">
                        {product.vendor}
                      </span>
                    </div>
                    <p className="font-bold text-xl text-indigo-500">
                      <Price price={product.variants[0].price} />
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className="flex justify-center py-10">
        <Pagination
          totalRecords={page.count}
          currentPage={+query.pageNum}
          pageHref={route}
        />
      </div>
    </section>
  )
}
