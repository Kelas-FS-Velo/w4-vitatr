// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  alias: {
    "#tailwind-config": resolve(__dirname, "tailwind.config"),
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devServer: {
    host: "myapp.test",
    port: 3000,
  },
  css: ["@/assets/css/tailwind.css"],
  modules: [
    "@qirolab/nuxt-sanctum-authentication",
    "shadcn-nuxt",
    "@nuxt/icon",
    "nuxt-headlessui",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/test-utils/module",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
  ],
  googleFonts: {
    families: {
      DynaPuff: true, // ini cukup
    },
    display: "swap", // untuk performa lebih baik
  },
  colorMode: {
    classSuffix: "",
  },
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

