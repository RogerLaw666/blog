---
title: docker中的mysql连接
date: 2021-04-26
category:
  - container
tag:
  - mysql
  - docker
---

## 概述

在 docker 中部署 mysql 服务在开发的过程中是很方便的。然而在远程访问 docker 中的 mysql 服务和 docker 外部挂载/var/lib/mysql 时，遇到了一些问题，现总结如下。

## 创建 mysql 容器

```bash
docker run -dp 3306:3306 --name roger-mysql mysql
```

## 进入 mysql 容器

```bash
docker exec -it roger-mysql /bin/bash
```

## 进入 mysql，修改 root 用户密码

```bash
mysql
use mysql
update user set authentication_string = password('123456') plugin='mysql_native_password' where user = 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
```

## 在容器中修改/var/lib/mysql 的所属用户，防止在 docker 外部挂载时的权限问题，引起 mysql 服务启动失败

```bash
chown -R mysql:mysql /var/lib/mysql
```
