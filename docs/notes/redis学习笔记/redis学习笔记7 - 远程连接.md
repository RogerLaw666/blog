---
title: redis学习笔记7 - 远程连接
date: 2022-06-24
category:
  - database
tag:
  - redis
prev: redis学习笔记6 - 关闭
next: redis学习笔记8 - docker安装redis
---

## 七、远程连接

### 7.1 Redis 远程连接比较流行的软件: RedisDesktoManager

默认不允许远程连接，需要修改一下信息才可以进行修改，

```bash
bind 127.0.0.1 # 注释掉 允许除本机以外的机器访问Redis服务
requirepass # 设置密码 设定数据库密码(有些情况不设定密码是无法进行远程连接访问的)
```

### 7.2 Redis 使用密码登录

```bash
# Redis客户端使用密码进行登录 【./bin/redis-cli -a redis】
./bin/redis-cli -a redis
```

## Centos 防火墙端口

开放 8080 端口（如下命令只针对 Centos7 以上）

查看已经开放的端口:

```bash
firewall-cmd --list-ports
```

开启端口:

```bash
firewall-cmd --zone=public --add-port-6379/tcp --permanent
```

重启防火墙:

```bash
firewall-cmd --reload #重启
Firewall systemctl stop firewalld.service #停止
firewall systemctl disable firewalld.service #禁止firewall 开机启动
```
