const withTM = require('next-transpile-modules')([
  '@next-storefront/core',
  '@next-storefront/shopify',
  '@next-storefront/stripe',
  '@next-storefront/json',
  '@next-storefront/utils',
])
const withImages = require('next-images')

module.exports = withTM(
  withImages({
    async rewrites() {
      return [
        {
          source: '/shop',
          destination: '/shop/1',
        },
        {
          source: '/tag/:tag',
          destination: '/tag/:tag/1',
        },
      ]
    },
    webpack: config => {
      config.resolve.alias['~'] = __dirname
      return config
    },
  }),
)
