module.exports = {
  publicRuntimeConfig: {
    site: {
      name: '',
      url:
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
      title: '',
      description: '',
      socialPreview: ''
    }
  },
  swcMinify: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/sweepin.appspot.com/o/**'
      }
    ]
  }
}
