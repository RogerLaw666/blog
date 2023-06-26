---
title: docker高级教程6 - 轻量级可视化工具Portainer
date: 2022-06-06
category:
  - container
tag:
  - docker
prev: docker高级教程5 - Docker-compose容器编排
next: docker高级教程7 - 容器监控之CAdvisor+InfluxDB+Granfana
---

## 六、Docker 轻量级可视化工具 Portainer

### 6.1 是什么

Portainer 是一款轻量级的应用，它提供了图形化界面，用于方便地管理 Docker 环境，包括单机环境和集群环境。

### 6.2 安装

一、官网

<https://www.portainer.io/>

<https://docs.portainer.io/v/ce-2.9/start/install/server/docker/linux>

二、步骤

- 1. docker 命令安装

```bash
docker run -d -p 8000:8000 -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

- 2. 第一次登录需创建 admin，访问地址：xxx.xxx.xxx.xxx:9000

用户名，直接用默认 admin
密码记得 8 位，随便你写

- 3. 设置 admin 用户和密码后首次登陆
- 4. 选择 local 选项卡后本地 docker 详细信息展示
- 5. 上一步的图形展示，能想得起对应命令吗？
- 6. 登陆并演示介绍常用操作 case
