---
title: redis学习笔记14 - Redis多数据库
date: 2022-06-24
category:
  - database
tag:
  - redis
prev: redis学习笔记13 - Redis的发布订阅
next: redis学习笔记15 - Redis事务
---

## 十四、Redis 多数据库

### 14.1 Redis 下，数据库是由一个整数索引标识，而不是一个数据库名称。默认情况下，一个客户端连接到**数据库 0**

redis 配置问阿金中下面的参数来控制数据库总数:

database 16 //（从 0 开始 1,2,3...15）

- **select 数据库** //数据库的切换

- **移动数据(将当前 key 移动另一库)**

```bash
move key 名称 数据库
```

### 14.2 数据库清空

```bash
flushdb: 清除当前数据库的所有key
flushall: 清除整个redis的数据库所有key
```
