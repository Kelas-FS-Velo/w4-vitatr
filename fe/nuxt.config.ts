// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    host: "myapp.test",
    port: 3000,
  },
  modules: ["@nuxtjs/tailwindcss"],
});

