import { PriceType } from '@next-storefront/core/types'

let currencyCodeToSymbolMap = {
  USD: '$', // US Dollar
  EUR: '€', // Euro
  CRC: '₡', // Costa Rican Colón
  GBP: '£', // British Pound Sterling
  ILS: '₪', // Israeli New Sheqel
  INR: '₹', // Indian Rupee
  JPY: '¥', // Japanese Yen
  KRW: '₩', // South Korean Won
  NGN: '₦', // Nigerian Naira
  PHP: '₱', // Philippine Peso
  PLN: 'zł', // Polish Zloty
  PYG: '₲', // Paraguayan Guarani
  THB: '฿', // Thai Baht
  UAH: '₴', // Ukrainian Hryvnia
  VND: '₫', // Vietnamese Dong
}

interface PriceProps {
  price: PriceType
  [key: string]: unknown
}

export function Price({ price, ...rest }: PriceProps) {
  return (
    <span {...rest}>
      {currencyCodeToSymbolMap[price.currencyCode]}&nbsp;
      {price.amount.toFixed(0)}
    </span>
  )
}
