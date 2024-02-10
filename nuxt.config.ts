// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/fontawesome.min.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore'
        ]
      }
    ]
  ],
  pinia: {
    storesDirs: ['stores'],
  },
})
