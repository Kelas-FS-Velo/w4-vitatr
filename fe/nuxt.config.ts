// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    host: "myapp.test",
    port: 3000,
  },
  css: ["@/assets/css/tailwind.css"],
  modules: [
    "@qirolab/nuxt-sanctum-authentication",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  laravelSanctum: {
    apiUrl: "http://api.myapp.test",
    authMode: "cookie",
    sanctumEndpoints: {
      csrf: "/sanctum/csrf-cookie",
      login: "/api/login",
      logout: "/api/logout",
      user: "/api/user",
    },

    redirect: {
      enableIntendedRedirect: false,
      loginPath: "/auth/login",
      guestOnlyRedirect: "/dashboard",
      redirectToAfterLogin: "/",
      redirectToAfterLogout: "/",
    },
  },
});

