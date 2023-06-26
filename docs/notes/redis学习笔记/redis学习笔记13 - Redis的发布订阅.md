---
title: redis学习笔记13 - Redis的发布订阅
date: 2022-06-24
category:
  - database
tag:
  - redis
prev: redis学习笔记12 - SpringBoot2.x中redis使用
next: redis学习笔记14 - Redis多数据库
---

## 十三、Redis 的发布订阅

### 13.1 redis 发布订阅简介

Redis 发布订阅(pub/sub)是一种消息通信模式: 发送者（pub）发送消息，订阅者（sub)接受消息。

Redis 客户端可以订阅任意数量的频道

Redis 发布订阅(pub/sub)是一种消息通信模式: 发送者（pub）发送消息，订阅者（sub)接受消息。
Redis 客户端可以订阅任意数量的频道。
下图展示了频道 channel1，以及订阅这个频道的三个客户端---client2，client5 和 client1 之间的关系。

![image-20200722224456077](./images/image-20200722224456077.png)

![image-20200809152404791](./images/image-20200809152404791.png)

```bash
//订阅端
SUBSCRIBE redischannel
Reading messages ...(press ctrl-c quit)
//发送端
PUBLIC redischannel "redis channel"
```
