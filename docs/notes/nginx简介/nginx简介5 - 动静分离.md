---
title: nginx简介5 - 动静分离
date: 2022-05-29
category:
  - server
tag:
  - nginx
prev: nginx简介4 - 反向代理
next: nginx简介6 - 高可用
---

### 五、动静分离

#### 5.1 什么是动静分离

Nginx 动静分离简单来说就是把动态跟静态请求分开，不能理解成只是单纯的把动态页面和

静态页面物理分离。

![16](./images/16.png)

#### 5.2 在 linux 系统中准备静态资源，用于进行访问

![17](./images/17.png)

#### 5.3 nginx 配置文件

![18](./images/18.png)

#### 5.4 测试

![19](./images/19.png)

![20](./images/20.png)
