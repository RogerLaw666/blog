---
title: redis学习笔记2 - 安装
date: 2022-06-24
category:
  - database
tag:
  - redis
prev: redis学习笔记1 - 简介
next: redis学习笔记3 - 启动
---

## 二、Redis 安装

### 2.1 Redis 官网

官方网站: <https://redis.io/>

官方下载: <https://redis.io/download> 可以根据需要下载不同版本

### 2.2 Redis 安装

Redis 是 C 语言开发，安装 Redis 需要先将官网下载的源码进行编译。编译依赖 gcc 环境，如果没有 gcc 环境，需要安装 gcc

### 2.3 安装 gcc

gcc 的安装很简单，首先要确保 root 登录，其次就是 Linux 要能连外网

```bash
yum -y install gcc automake autoconf libtool make
```

**注意:** 运行 yum 是出现/var/run/yum.pid 已被锁定，PID 为 xxxx 的另外一个程序正在运行的问题解决。

```bash
rm -f /var/run/yum.pid
```

### 2.4 安装 Redis

- **下载 redis 二进制安装包**

```bash
wget http://download.redis.io/release/redis-6.0.5.tar.gz
```

- **解压/apps 目录下**

```bash
tar zxvf redis-6.0.5.tar.gz -C /apps
#Linux 中剪切命令
mv redis-6.0.5.tar.gz 安装包
#Linux中复制命令: cp Files path
cp redis-6.0.5.tar.gz /root/apps
```

进入 redis 中使用 make 命令进行编译

```bash
make MALLOC=libc
```

```bash
    LINK redis-cli
    CC redis-benchmark.o
    LINK redis-benchmark
    INSTALL redis-check-rdb
    INSTALL redis-check-aof
```

- **安装成功如上**

### 2.5 安装到指定的位置

```bash
make PREFIX=/root/apps/redis install
```

（安装编译后的文件）安装到指定目录；

注意: PREFIX 必须为大写，同时会自动为我们创建 redis 目录，并将结果安装此目录
