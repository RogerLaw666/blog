---
title: redis学习笔记8 - docker安装redis
date: 2022-06-24
category:
  - database
tag:
  - redis
prev: redis学习笔记7 - 远程连接
next: redis学习笔记9 - 常用命令
---

## 八 、Docker 安装 Redis

### 8.1 搜索 redis

```bash
docker search redis
```

### 8.2 下载镜像

```bash
docker pull redis:4.0.1
```

### 8.3 创建并运行容器

```bash
docker run -d --name redis6379 -p 6379:6379 redis:4.0.1 --requirepass "redis"
```

### 8.4 测试进入 Redis 进入客户端

使用 redis 镜像执行 redis-cli 命令连接到刚启动的容器
