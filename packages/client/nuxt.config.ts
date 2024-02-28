// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // tailwind stuff
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // dev server
  devServer: {
    port: 8000,
  },

  // env
  runtimeConfig: {
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  }
})
