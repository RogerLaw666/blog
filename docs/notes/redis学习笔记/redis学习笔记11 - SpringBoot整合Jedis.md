---
title: redis学习笔记11 - SpringBoot整合Jedis
date: 2022-06-24
category:
  - database
tag:
  - redis
prev: redis学习笔记10 - 数据类型
next: redis学习笔记12 - SpringBoot2.x中redis使用
---

## 十一、SpringBoot 整合 Jedis

### 11.1 简介

​我们在使用 springboot 搭建微服务的时候，在很多时候还是需要 redis 的高速缓存来缓存一些数据，存储一些高品率访问的数据，如果直接使用 redis 的话由比较麻烦，在这里，我们使用 jedis 来实现 redis 缓存达到高效缓存的目的。

### 11.2 引入 Jedis 依赖

```xml
<!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.2.0</version>
</dependency>

```

因为 SpringBoot 内默认引用了 jedis 版本。

所以我们直接引入 jedis 依赖无需配置 jedis 的版本好了。
