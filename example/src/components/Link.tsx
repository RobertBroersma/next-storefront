import NextLink from 'next/link'
import { useRouter } from 'next/router'

export function Link({ href, ...rest }) {
  let router = useRouter()

  let className =
    router.pathname.includes(href) && href !== '/'
      ? 'text-indigo-500'
      : 'text-gray-800'

  return (
    <NextLink href={href}>
      <a className={`${className} hover:text-indigo-600`} {...rest} />
    </NextLink>
  )
}
