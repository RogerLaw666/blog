import { navbar } from "vuepress-theme-hope";

export const zh = navbar([
  "/",
  {
    text: "笔记",
    icon: "note",
    prefix: "/notes/",
    children: [
      {
        text: "docker基础教程",
        link: "docker基础教程/docker基础教程1 - 简介",
      },
      {
        text: "docker高级教程",
        link: "docker高级教程/docker高级教程1 - 复杂安装",
      },
      {
        text: "k8s详细教程",
        link: "k8s详细教程/k8s详细教程1 - 介绍",
      },
      {
        text: "nginx简介",
        link: "nginx简介/nginx简介1 - 概述",
      },
      {
        text: "vue2属性详解",
        link: "vue2属性详解/vue2属性详解",
      },
      {
        text: "vue3详细笔记",
        link: "vue3详细笔记/vue3详细笔记1 - 简介",
      },
      {
        text: "redis学习笔记",
        link: "redis学习笔记/redis学习笔记1 - 简介",
      },
      {
        text: "redis高级笔记",
        link: "redis高级笔记/redis高级笔记1 - NoSQL数据库简介",
      },
    ],
  },
  {
    text: "分享",
    icon: "share",
    prefix: "/shares/",
    children: [
      {
        text: "AWS的ECS介绍",
        link: "AWS的ECS介绍/AWS的ECS介绍",
      },
      {
        text: "TRTC实时音视频",
        link: "TRTC实时音视频/TRTC实时音视频",
      },
    ],
  },
  {
    text: "文章分类",
    icon: "categoryselected",
    link: "/category/",
  },
  {
    text: "文章标签",
    icon: "tag",
    link: "/tag/",
  },
  {
    text: "关于佳哥",
    icon: "emoji",
    link: "/about/",
  },
]);
