import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getTagPages } from '@next-storefront/core/adapter'
import { ArrowRight } from 'react-feather'

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

interface HomePageProps {
  tags: {
    tag: string
    pageCount: number
  }[]
}

export default function HomePage({ tags }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Next Storefront • Statik.ly</title>
        <meta
          property="description"
          content="A dazzlingly fast E-Commerce solution built with Typescript and NextJS."
        />
      </Head>
      <header
        className="rounded overflow-hidden bg-cover bg-center flex items-center relative max-h-screen"
        style={{
          height: 450,
          backgroundImage:
            // 'url(https://images.unsplash.com/photo-1588922800585-6ad18d662333?ixlib=rb-1.2.1&auto=format&fit=crop&crop=right&w=1920&h=600&q=80',
            'url(https://images.unsplash.com/photo-1503664974666-c4b8f669f3ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&h=700&q=80&crop=faces&fp-y=0.20)',
        }}
      >
        <div className="bg-gradient-to-r from-black via-black to-transparent opacity-25 h-full w-full absolute inset-0" />
        <div className="xl:container px-8 relative text-white leading-none">
          <h1 className="text-6xl font-bold">Henlo there</h1>
          <p className="text-xl pt-4 opacity-75">
            Big floof would like you to buy a shirt
          </p>
          <Link href="/tag/shirt">
            <a className="inline-flex mt-8 bg-white rounded text-black font-bold text-xl uppercase tracking-wide py-5 px-8 items-center shadow-lg hover:bg-black hover:text-white">
              Shop Shirts <ArrowRight className="w-5 h-5 ml-3" />
            </a>
          </Link>
        </div>
      </header>
      <div className="pt-16">
        {/* NAV */}
        {/* HEADER */}

        <section className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/tag/shirt">
            <a className="group rounded overflow-hidden pb-2/3 relative h-0">
              <img
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
                alt="T-shirts on a rack"
                className="w-full absolute inset-0 h-full object-cover transform group-hover:scale-105 transition-transform duration-150"
              />
              <div className="absolute w-full h-full flex justify-center items-center">
                <div className="rounded text-white bg-black font-bold tracking-wider text-xl uppercase px-5 py-2">
                  Shirts
                </div>
              </div>
            </a>
          </Link>
          <Link href="/tag/men">
            <a className="group rounded overflow-hidden pb-2/3 relative h-0">
              <img
                src="https://images.unsplash.com/photo-1578932750355-5eb30ece487a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
                alt="T-shirts on a rack"
                className="w-full absolute inset-0 h-full object-cover transform group-hover:scale-105 transition-transform duration-150"
              />
              <div className="absolute w-full h-full flex justify-center items-center">
                <div className="rounded text-white bg-black font-bold tracking-wider text-xl uppercase px-5 py-2">
                  Sweats
                </div>
              </div>
            </a>
          </Link>
          <Link href="/tag/women">
            <a className="group rounded overflow-hidden pb-2/3 relative h-0">
              <img
                src="https://images.unsplash.com/photo-1587281148103-543bf73f6748?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
                alt="T-shirts on a rack"
                className="w-full absolute inset-0 h-full object-cover transform group-hover:scale-105 transition-transform duration-150"
              />
              <div className="absolute w-full h-full flex justify-center items-center">
                <div className="rounded text-white bg-black font-bold tracking-wider text-xl uppercase px-5 py-2">
                  Tank tops
                </div>
              </div>
            </a>
          </Link>
          <Link href="/tag/men">
            <a className="group rounded overflow-hidden pb-2/3 relative h-0">
              <img
                src="https://images.unsplash.com/photo-1578470507807-3fc541d5f544?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
                alt="T-shirts on a rack"
                className="w-full absolute inset-0 h-full object-cover transform group-hover:scale-105 transition-transform duration-150"
              />
              <div className="absolute w-full h-full flex justify-center items-center">
                <div className="rounded text-white bg-black font-bold tracking-wider text-xl uppercase px-5 py-2">
                  Hoodies
                </div>
              </div>
            </a>
          </Link>
        </section>
        {/* WOMEN'S PRODUCTS + EXPLORE LINK */}
        {/* MEN'S CAROUSEL + EXPLORE LINK */}
        {/* FOOTER */}
        <ul className="pt-24 grid grid-cols-4 gap-4">
          {tags.map(({ tag, pageCount }) => (
            <li key={tag} className="block">
              <Link href={`/tag/${tag}`}>
                <a className="font-bold tracking-wider uppercase bg-indigo-500 text-white rounded-lg px-4 h-24 flex justify-center items-center text-center hover:bg-indigo-600">
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
    </>
  )
}
