---
title: postgres-cli的基本使用
date: 2022-06-22
category:
  - database
tag:
  - postgres
---

## 连接到 Postgres

```bash
# 切换到postgres用户并连接postgres
sudo -u postgres psql postgres
# 使用my_username用户连接到my_database
psql -d my_database -U my_username
```

## 使用 Postgres

```bash
# 连接到数据库
\c <database name>
# 备份数据库
pg_dump <database name> > <outfile>
# 创建数据库
CREATE DATABASE demodb1;
# 删除数据库
DROP DATABASE demodb1;
```

## 查看 Postgres

```bash
# 列出数据库
\l
# 列出角色
\du
# 列出表
\dt
# 列出函数
\df
# 列出函数并显示信息
\df+
# 列出表结构
\d <tablename>
```

## 角色和权限

```bash
# 创建角色
CREATE ROLE demorole1 WITH LOGIN ENCRYPTED PASSWORD 'password1' CREATEDB;
# 修改角色
ALTER ROLE demorole1 CREATEROLE CREATEDB REPLICATION SUPERUSER;
# 删除角色
DROP ROLE demorole1;
# 赋予权限
GRANT ALL PRIVILEGES ON DATABASE demodb1 TO demorole1;
```
