import { hopeTheme } from "vuepress-theme-hope";
import * as navbar from "./navbar";

const hostname = process.env.HOSTNAME || "https://www.luojia.work";

export default hopeTheme({
  hostname,

  author: {
    name: "佳哥",
    url: "https://luojia.work",
  },

  // pure: true,

  darkmode: "toggle",

  fullscreen: true,

  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },

  iconPrefix: "iconfont icon-",

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {},

  lastUpdated: false,
  editLink: false,
  contributors: false,

  locales: {
    "/": {
      // navbar
      navbar: navbar.zh,

      // sidebar
      sidebar: false,

      footer:
        'Copyright © 2021-2022 roger | <a href="https://beian.miit.gov.cn/">蜀ICP备2021031381号-1</a>',

      displayFooter: true,

      copyright: false,

      blog: {
        name: "佳哥很忙",
        avatar: "/images/icons/avatar.png",
        description: "不要回头，一直向前！",
        intro: "about.html",
        articlePerPage: 10,
      },
    },
  },

  plugins: {
    blog: true,

    copyright: true,

    // pwa: {
    //   showInstall: true,
    //   favicon: "/images/icons/logo.ico",
    // },

    copyCode: { duration: 1000, showInMobile: true },

    comment: {
      provider: "Waline",
      serverURL: "https://comment.blog.luojia.work",
      dark: "auto",
      copyright: false,
      pageSize: 10,
    },

    mdEnhance: false,

    seo: {
      canonical: "https://www.luojia.work/",
    },
  },
});
