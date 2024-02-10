// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@sidebase/nuxt-session',
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
  session: {
    session: {
      expiryInSeconds: 60 * 60 * 24 * 7,
    }
  },
  pinia: {
    storesDirs: ['stores'],
  },
})
