import { useCallback, useState } from 'react'
import { useCart } from '@next-storefront/core/hooks/useCart'
import { Product } from '@next-storefront/core/types'
import { Price } from 'src/components/atoms/Price'
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  Dot,
} from 'pure-react-carousel'
import { GitHub, Twitter } from 'react-feather'
import Head from 'next/head'
import { useRouter } from 'next/router'

function findVariantByOptions(product: Product, options: string[]) {
  return product.variants.find(
    variant =>
      variant.name ===
      (options.length > 0 ? options.join(' / ') : product.name),
  )
}

function DefaultSelector({ options, value, onChange }) {
  return (
    <select
      className="form-select"
      defaultValue={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

let variantColorMap = {
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  cyan: 'bg-teal-500',
  blue: 'bg-blue-500',
}

let variantColorBorderMapActive = {
  orange: 'bg-orange-300',
  red: 'bg-red-300',
  cyan: 'bg-teal-300',
  blue: 'bg-blue-300',
}

// TODO: Make a11y
function ColorSelector({ options, value, onChange }) {
  return options.map(option => (
    <div className="flex" key={option}>
      <div
        className={`rounded-full flex justify-center items-center transition-all duration-150 ${
          option === value ? variantColorBorderMapActive[option] : 'm-1'
        }`}
      >
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`border-transparent rounded-full w-5 h-5 focus:outline-none transition-all duration-150 ${
            variantColorMap[option]
          } ${option === value ? 'm-1' : 'm-0'}`}
        />
      </div>
    </div>
  ))
}

let optionComponents = {
  Color: ColorSelector,
}

interface ProductPageProps {
  product: Product
}

export function ProductPage({ product }: ProductPageProps) {
  let { asPath } = useRouter()
  let { addToCart } = useCart()

  let [selectedOptions, setSelectedOptions] = useState(
    () => product.options?.map(option => option.values[0]) || [],
  )

  let setSelectedOptionAtIndex = useCallback(
    index => newValue => {
      setSelectedOptions(current =>
        current.map((value, i) => {
          if (i === index) {
            return newValue
          }

          return value
        }),
      )
    },
    [],
  )

  let addProductToCart = useCallback(() => {
    addToCart({
      product,
      variantId: findVariantByOptions(product, selectedOptions).id,
      quantity: 1,
    })
  }, [addToCart, selectedOptions])

  return (
    <>
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
      <Head>
        <title>{product.name} • Statik.ly</title>
        <meta property="description" content={product.description} />
        <meta property="image" content={product.images[0].src} />
        {/* <meta
          property="canonical"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`}
        /> */}

        <meta property="og:type" content="product" />
        {/* <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`}
        /> */}
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0].src} />

        <meta
          property="product:price:amount"
          content={product.variants[0].price.amount.toFixed(2)}
        />
        <meta
          property="product:price:currency"
          content={product.variants[0].price.currencyCode}
        />

        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:creator" content={twitterUsername} /> */}
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.images[0].src} />
      </Head>
      <CarouselProvider
        naturalSlideWidth={496}
        naturalSlideHeight={496}
        totalSlides={product.images.length}
        infinite
      >
        <section className="text-gray-700 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:h-auto h-64">
                <Slider>
                  {product.images.map((image, index) => (
                    <Slide key={image.src} index={index}>
                      <Image
                        src={image.src}
                        hasMasterSpinner={false}
                        className="object-cover object-center rounded-lg"
                      />
                    </Slide>
                  ))}
                </Slider>
                <div className="flex justify-center gap-4 py-4">
                  {product.images.length > 1
                    ? product.images.map((image, index) => (
                        <Dot
                          key={index}
                          slide={index}
                          className="h-20 w-20 disabled:opacity-50 rounded-lg overflow-hidden"
                        >
                          <img
                            className="object-cover h-full w-full"
                            src={image.src}
                            alt={image.altText}
                          />
                        </Dot>
                      ))
                    : undefined}
                </div>
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font uppercase text-gray-500 tracking-widest">
                  {product.vendor}
                </h2>
                <h1 className="text-gray-900 text-4xl title-font font-bold mb-1">
                  {product.name}
                </h1>
                <div className="flex mb-4">
                  <span className="flex py-2 gap-1">
                    <a
                      className="text-gray-500 hover:text-indigo-500"
                      href="https://twitter.com/robertbrosma"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      className="ml-2 text-gray-500 hover:text-indigo-500"
                      href="https://github.com/RobertBroersma"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHub className="w-5 h-5" />
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{product.description}</p>

                {product.options?.map((option, index) => {
                  let Component =
                    optionComponents[option.name] || DefaultSelector

                  return (
                    <div
                      key={option.name}
                      className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"
                    >
                      <Component
                        options={option.values}
                        value={selectedOptions[index]}
                        onChange={setSelectedOptionAtIndex(index)}
                      />
                    </div>
                  )
                })}

                <div className="flex items-center">
                  <Price
                    price={product.variants[0].price}
                    className="title-font font-bold text-2xl text-gray-900"
                  />
                  <div className="ml-auto flex flex-col items-center">
                    <button
                      onClick={addProductToCart}
                      className="font-bold flex text-white bg-indigo-500 border-0 py-3 px-10 text-lg focus:outline-none hover:bg-indigo-600 rounded-full"
                    >
                      Add to Cart
                    </button>
                    <p className="text-gray-600 text-center pt-2 text-xs">
                      {product.totalInventory} In stock
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </CarouselProvider>
    </>
  )
}
