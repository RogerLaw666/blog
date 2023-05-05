---
title: 使用容器开发vue
date: 2023-02-14
category:
  - vue
tag:
  - docker
  - vue
---

## 概述

容器中的 webpack 默认会使用容器中的地址，这个地址外部无法访问，从而无法使用热更新。

## 解决方案

```javascript
// vue.config.js
module.exports = {
  devServer: {
    public: "0.0.0.0:8080",
  },
};
```
