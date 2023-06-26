---
title: redis学习笔记22 - Redis中的拓展
date: 2022-06-24
category:
  - database
tag:
  - redis
prev: redis学习笔记21 - Redis Cluster集群
next: redis学习笔记23 - 重新配置RedisTemplate
---

## 二十二、Redis 中的拓展

### 22.1 Redis 为什么单线程还这么快

1. 误区 1: 高性能的服务器一定是多线程的？

2. 误区 2: 多线程（CUP 上下文会切换！）一定比单线程效率高！

先去 CPU>内存>硬盘的速度要有所了解！

核心: redis 是将所有的数据全部放在内存中的，所以说使用单线程去操作效率就是最高的。

多线程（CPU 上下文切换: 耗时！！！），对于内存来说，如果没有上下文切换效率就是最高的。对此读写就是在 CPU 上所以 Redis 的速度是非常快的。
