---
title: redis学习笔记9 - 常用命令
date: 2022-06-24
category:
  - database
tag:
  - redis
prev: redis学习笔记8 - docker安装redis
next: redis学习笔记10 - 数据类型
---

## 九、Redis 常用命令

Redis 命令用于在 redis 服务上执行操作。要在 redis 服务上执行命令需要一个 redis 客户端。

Redis 客户端在我们之前下载的 Redis 的安装包中。

\*\*Redis 支持的物种数据类型: string(字符串)，hash(哈希)，list(列表)，set(集合)及 zset（sorted set : 有序集合）等

### 9.1 常用命令 key 管理

- keys _: 返回满足的所有键，可以模糊匹配，比如 keys abc_: 表示以 abc 开头的 key
- exists key: 是否存在指定的 key ，存在返回 1.不存在返回 0
- expire key second: 设置某个 key 的过期时间 时间为妙
- del key: 删除某个 key
- ttl key: 查看剩余时间，当 key 不存在是，返回-2；存在但没有设置剩余生存时间时，返回 -1，否 则，以秒为单位，返回 key 的剩余生存时间。
- persist key: 取消过去时间
- pexpire key millisseconds: 修改 key 的过期时间为毫秒
- select: 选择数据库 数据库为 0-15（默认一共 16 个数据库） 设计成多个数据库实际上是为了数据库安全和备份
- move key dbindex: 将当前数据中的 key 转移到其他数据库
- randomkey: 随机返回一个 key
- rename key key2: 种命名 key
- echo: 打印命令
- dbsize: 查看数据库的 key 数量
- info: 查看数据库信息
- config get \* 实时存储收到的请求，返回相关的配置
- flushdb: 清除当前数据库
- flushall: 清空所有数据库

### 9.2 DEL key

该命令用于在 key 存在时删除 key。

### 9.3 EXISTS key

检查给定 key 是否存在。

### 9.4 EXPIRE key seconds

为给定 key 设置过期时间(以秒计)

### 9.5 PEXPIRE key milliseconds

设置 key 的过期时间以毫秒计

### 9.6 TTL key

以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)

### 9.7 PTTL key

以秒为单位，返回 key 的剩余生存时间

### 9.8 KEYS pattern

查找所有服务给定模式(pattern)的 key。
keys 通配符 获取所有与 pattern 匹配的 key，返回所有与该匹配
通配符: \* 代表所有 ? 表示代表一个字符

### 9.9 RENAME key newkey

修改 key 的名称

### 9.10 MOVE key db

将当前数据库的 key 移动到给定的数据库 db 当中

### 9.11 TYPE key

返回 key 所存储的值的类型

### 9.12 应用场景

- **EXPIPER key seconds**

  1. 限时的优惠活动信息
  2. 网站数据缓存(对于一些需要定时更新的数据，例如:积分排行榜)
  3. 手机验证码
  4. 限制网站访客访问频率(例如: 1 分钟最多访问 10 次)

### 9.13 key 的命名建议

- **redis 单个 key 允许存入 512M 大小**

  1. key 不要太长，尽量不要超过 1024 字节，这不仅消耗内存，而且会降低查找的效率
  2. key 也不要太短，太短的话，key 的可读性会降低
  3. 在一个项目中，key 最好使用提议的命名模式，例如 user:12:password
  4. key 名称区分大小写
