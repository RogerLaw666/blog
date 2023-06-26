---
title: vue3详细笔记2 - 创建
date: 2022-06-13
category:
  - vue
tag:
  - vue3
prev: vue3详细笔记1 - 简介
next: vue3详细笔记3 - Composition API 的优势
---

## 1.使用 vue-cli 创建

官方文档：<https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create>

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

## 2.使用 vite 创建

官方文档：<https://v3.cn.vuejs.org/guide/installation.html#vite>

vite 官网：<https://vitejs.cn>

- 什么是 vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite 构建对比图

![bundler](./images/bundler.37740380.png)

![esm](./images/esm.3070012d.png)

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```
