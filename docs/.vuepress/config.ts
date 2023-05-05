import { searchPlugin } from "@vuepress/plugin-search";
import { defineUserConfig } from "vuepress";
import theme from "./theme";

const base = (process.env.BASE as "/" | `/${string}/`) || "/";

export default defineUserConfig({
  lang: "zh-CN",

  base,

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
    ["link", { rel: "icon", href: "/images/icons/logo.ico" }],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "佳哥的技术博客",
      description: "佳哥的技术博客",
    },
  },

  plugins: [
    searchPlugin({
      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
    }),
  ],

  shouldPrefetch: false,

  theme,
});
