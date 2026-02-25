export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Корзина',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap',
        },
      ],
    },
  },
})