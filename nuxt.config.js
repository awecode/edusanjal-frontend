const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'edusanjal',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nepal&apos;s leading education portal'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#fff'},
  css: [
    'assets/scss/main.scss'
  ],
  modules: [
    // '@nuxtjs/pwa',
  ],
  plugins: ['~/plugins/axios.js',
    {src: '~/plugins/localStorage.js', ssr: false},
    {src: '~/plugins/offline.js', ssr: false},
    {src: '~/plugins/lazyload.js', ssr: false},
    {src: '~/plugins/smoothScroll.js', ssr: false},
  ],
  env: {
    API_URL: isDev ? 'http://192.168.0.143:8000' : 'https://api.edusanjal.com/'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['axios'],
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
};
