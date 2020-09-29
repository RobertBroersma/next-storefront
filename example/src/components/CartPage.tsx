import { useCart } from '@next-storefront/core/hooks/useCart'
import { Price } from './atoms/Price'

export function CartPage() {
  let { cart, goToCheckout, totalPrice, removeFromCart, addToCart } = useCart()

  return (
    <>
      {cart.length > 0 ? (
        <div className="flex justify-center my-6">
          <div className="flex flex-col w-full p-8 text-gray-800 bg-white md:w-4/5 lg:w-4/5">
            <div className="flex-1">
              <table className="w-full text-sm lg:text-base" cellSpacing={0}>
                <thead>
                  <tr className="h-12 uppercase">
                    <th className="hidden md:table-cell" />
                    <th className="text-left">Product</th>
                    <th className="lg:text-right text-left pl-5 lg:pl-0">
                      <span className="lg:hidden" title="Quantity">
                        Qtd
                      </span>
                      <span className="hidden lg:inline">Quantity</span>
                    </th>
                    <th className="hidden text-right md:table-cell">
                      Unit price
                    </th>
                    <th className="text-right">Total price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => {
                    let variant = item.product.variants.find(
                      variant => variant.id === item.variantId,
                    )

                    return (
                      <tr key={item.variantId}>
                        <td className="hidden pb-4 md:table-cell">
                          <a href="#">
                            <img
                              src={variant.image.src}
                              className="w-20 rounded"
                              alt={variant.image.altText}
                            />
                          </a>
                        </td>
                        <td>
                          <a href="#">
                            <p className="mb-2 md:ml-4">
                              {item.product.name}&mdash;
                              {variant.name}
                            </p>
                            <button
                              onClick={() =>
                                removeFromCart(item.variantId, item.quantity)
                              }
                              type="submit"
                              className="text-gray-700 md:ml-4"
                            >
                              <small>(Remove item)</small>
                            </button>
                          </a>
                        </td>
                        <td className="justify-center md:justify-end md:flex mt-6">
                          <div className="w-20 h-10">
                            <div className="relative flex flex-row w-full h-8">
                              <input
                                onChange={e =>
                                  item.quantity - +e.target.value > 0
                                    ? removeFromCart(
                                        item.variantId,
                                        item.quantity - +e.target.value,
                                      )
                                    : addToCart({
                                        ...item,
                                        quantity:
                                          +e.target.value - item.quantity,
                                      })
                                }
                                step={1}
                                type="number"
                                value={item.quantity}
                                className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="hidden text-right md:table-cell">
                          <span className="text-sm lg:text-base font-medium">
                            <Price price={variant.price} />
                          </span>
                        </td>
                        <td className="text-right">
                          <span className="text-sm lg:text-base font-medium">
                            <Price
                              price={{
                                ...variant.price,
                                amount: variant.price.amount * item.quantity,
                              }}
                            />
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <hr className="pb-6 mt-6" />
              <div className="my-4 mt-6 -mx-2 lg:flex">
                <div className="lg:w-1/2" />
                <div className="lg:px-2 lg:w-1/2">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between border-b">
                      <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Total
                      </div>
                      <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        <Price price={totalPrice} />
                      </div>
                    </div>
                    <button
                      onClick={goToCheckout}
                      className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full item-center hover:bg-gray-700 focus:outline-none"
                    >
                      <svg
                        aria-hidden="true"
                        data-prefix="far"
                        data-icon="credit-card"
                        className="w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                        />
                      </svg>
                      <span className="ml-2 mt-5px">Procceed to checkout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-24">Your cart is empty!</div>
      )}
    </>
  )
}
