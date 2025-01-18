/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: [
      'coin98.s3.amazonaws.com',
      'cdn.cryptogoodies.shop',
      's2.coinmarketcap.com',
      'cdn.prod.website-files.com',
      'zengo.com',
      'avatars.githubusercontent.com',
      'pbs.twimg.com',
      '1inch.io',
      'cryptologos.cc',
      'file.coin98.com',
      'raw.githubusercontent.com',
      'assets.coingecko.com',
      'coin98.s3.ap-southeast-1.amazonaws',
      'coin98.s3.ap-southeast-1.amazonaws.com',
      'coin-images.coingecko.com',
      'coin98.s3-ap-southeast-1.amazonaws.com',
    ],
  },
  transpilePackages: ['@repo/ui'],
}
