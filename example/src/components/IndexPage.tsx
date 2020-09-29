import Link from 'next/link'
import { Product, Paginated } from '@next-storefront/core/types'
import { Price } from 'src/components/atoms/Price'
import { Pagination } from 'src/components/Pagination'
import { useRouter } from 'next/router'

interface IndexPageProps {
  title?: string
  page: Paginated<Product>
}

export function IndexPage({ page }: IndexPageProps) {
  let { query, route } = useRouter()

  if (!page) {
    console.log('PAGE NOT GENERATED', route)
    return <>Something went wrong</>
  }

  return (
    <section className="text-gray-700 body-font bg-gray-200">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {page.results.map(product => (
            <div key={product.id} className="lg:w-1/3 md:w-1/2 p-4 w-full">
              <div className="bg-white h-full rounded-lg flex flex-col">
                <div className="flex flex-col items-center p-8">
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt={product.images[0].altText}
                      className="object-contain object-center w-full h-full block"
                      src={product.images[0].src}
                    />
                  </a>
                  <h2 className="text-gray-900 title-font text-lg font-extrabold capitalize text-center">
                    {product.name}
                  </h2>
                </div>

                <div className="mt-auto py-3 border-t border-gray-400 flex w-full">
                  <p className="font-bold py-1 text-center flex-1 border-r border-gray-400">
                    <Price price={product.variants[0].price} />
                  </p>
                  <Link href={`/product/${product.slug}`}>
                    <a className="flex-1 py-1 flex justify-center items-center text-center font-bold text-indigo-400 hover:text-indigo-500">
                      Shop Now
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-10">
          <Pagination
            totalRecords={page.count}
            currentPage={+query.pageNum}
            pageHref={route}
          />
        </div>
      </div>
    </section>
  )
}
