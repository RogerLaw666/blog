---
title: redis学习笔记6 - 关闭
date: 2022-06-24
category:
  - database
tag:
  - redis
prev: redis学习笔记5 - 启动方式
next: redis学习笔记7 - 远程连接
---

## 六、Redis 关闭

### 6.1、第一种关闭方式

(断电、非正常关闭，容易数据丢失) 查询不到 redis 进程 id

```bash
PID ps -ef | grep -i redis
```

kill 查询的 id 进行强制关闭

```bash
kill -9 PID
```

### 6.2、第二种关闭方式

(正常关闭，数据保存)

- **关闭 redis 服务，通过客户端进行 shutdown**

如果 redis 设置了密码，需要先在客户端通过密码登录，在进行 shutdown 即可关闭服务端

```bash
# 在客户端使用【shutdown】命令关闭Redis服务端
127.0.0.1:6379> SHUTDOWN
```
