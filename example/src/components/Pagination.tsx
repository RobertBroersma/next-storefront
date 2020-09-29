import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { forwardRef } from 'react'
import { useRouter } from 'next/router'
import { UrlObject } from 'url'

const range = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

interface BlockProps {
  isActive: boolean
  children: React.ReactNode
}

const Block = forwardRef<HTMLAnchorElement, BlockProps>(
  ({ isActive, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`w-16 h-16 flex items-center justify-center hover:text-indigo-400 ${
          isActive ? 'text-indigo-400' : ''
        }`}
        {...props}
      />
    )
  },
)

interface PaginationProps {
  totalRecords: number
  itemsPerPage?: number
  currentPage: number
  pageHref: string
  showPages?: number
}

function makeHref(urlObject: UrlObject) {
  let groups = urlObject.pathname.match(/\[(.*?)\]/g)

  let url = groups.reduce(
    (pathname, segment) =>
      pathname.replace(
        segment,
        urlObject.query[segment.replace('[', '').replace(']', '')],
      ),
    urlObject.pathname,
  )

  return url
}

export function Pagination({
  totalRecords,
  itemsPerPage = +process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || 9,
  currentPage,
  showPages = 3,
}: PaginationProps) {
  let { query, pathname } = useRouter()

  let totalPages = Math.ceil(totalRecords / itemsPerPage)

  if (!totalRecords || totalPages === 1) return null

  let pages
  if (currentPage < showPages) {
    pages = range(2, Math.min(showPages, totalPages)).filter(
      i => i !== 1 && i !== totalPages,
    )
  } else if (currentPage > totalPages - showPages) {
    pages = range(Math.max(totalPages - showPages, 2), totalPages - 1).filter(
      i => i !== 1 && i !== totalPages,
    )
  } else {
    pages = [currentPage - 1, currentPage, currentPage + 1].filter(
      i => i !== 1 && i !== totalPages,
    )
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex bg-white w-full rounded-lg font-bold"
    >
      <ul className="flex w-full divide-x-2 divide-gray-200 items-stretch text-center">
        {/* PREV */}
        {currentPage > 1 ? (
          <li className="px-2 flex-1">
            <Link
              href={makeHref({
                pathname,
                query: { ...query, pageNum: currentPage - 1 },
              })}
            >
              <a
                aria-label="Previous"
                className="flex justify-center font-bold h-16 items-center hover:text-indigo-400"
              >
                <span aria-hidden="true" className="flex">
                  <ArrowLeft /> Prev
                </span>
                <span className="sr-only">Previous</span>
              </a>
            </Link>
          </li>
        ) : (
          <li className="px-2 flex-1 flex justify-center items-center">
            <span aria-hidden="true" className="flex opacity-50">
              <ArrowLeft /> Prev
            </span>
            <span className="sr-only">Previous</span>
          </li>
        )}
        {/* /PREV */}

        {/* PAGE 1 */}
        <li className="hidden sm:flex">
          <Link
            href={makeHref({
              pathname,
              query: { ...query, pageNum: 1 },
            })}
            passHref
          >
            <Block isActive={currentPage === 1}>1</Block>
          </Link>
        </li>
        {/* /PAGE 1 */}

        {/*  HELLIP */}
        {!pages.includes(1) && !pages.includes(2) && totalPages > 3 ? (
          <li className="h-16 items-center justify-center w-16 hidden sm:flex">
            &hellip;
          </li>
        ) : undefined}
        {/* /HELLIP */}

        {/* PAGE LOOP */}
        {pages.map((page, index) => (
          <li
            key={index}
            className={`${page !== currentPage ? 'hidden' : ''} sm:block`}
          >
            <Link
              href={makeHref({
                pathname,
                query: { ...query, pageNum: page },
              })}
              passHref
            >
              <Block isActive={currentPage === page}>{page}</Block>
            </Link>
          </li>
        ))}
        {/* /PAGE LOOP */}

        {/* HELLIP */}
        {!pages.includes(totalPages) &&
        !pages.includes(totalPages - 1) &&
        totalPages > 3 ? (
          <li className="h-16 items-center justify-center w-16 hidden sm:flex">
            &hellip;
          </li>
        ) : undefined}
        {/* /HELLIP */}

        {/* LAST PAGE */}
        <li className="hidden sm:flex">
          <Link
            href={makeHref({
              pathname,
              query: { ...query, pageNum: totalPages },
            })}
            passHref
          >
            <Block isActive={currentPage === totalPages}>{totalPages}</Block>
          </Link>
        </li>
        {/* LAST PAGE */}

        {/* NEXT */}
        {currentPage < totalPages ? (
          <li className="px-2 flex-1">
            <Link
              href={makeHref({
                pathname,
                query: { ...query, pageNum: currentPage + 1 },
              })}
            >
              <a
                aria-label="Previous"
                className="flex justify-center items-center font-bold h-16 hover:text-indigo-400"
              >
                <span aria-hidden="true" className="flex">
                  Next <ArrowRight />
                </span>
                <span className="sr-only">Previous</span>
              </a>
            </Link>
          </li>
        ) : (
          <li className="px-2 flex-1 text-center flex justify-center items-center">
            <span aria-hidden="true" className="flex opacity-50">
              Next <ArrowRight />
            </span>
            <span className="sr-only">Previous</span>
          </li>
        )}
        {/* /LAST */}
      </ul>
    </nav>
  )
}
