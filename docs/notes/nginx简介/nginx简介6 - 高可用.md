---
title: nginx简介6 - 高可用
date: 2022-05-29
category:
  - server
tag:
  - nginx
prev: nginx简介5 - 动静分离
---

### 六、高可用

#### 6.1 Keeplived+Nginx 高可用集群（主从模式）

![21](./images/21.png)

1、需要两台服务器 192.168.0.105 和 192.168.0.102

![22](./images/22.png)

2、在两台服务器上安装 nginx 和 keeplived

> #1.安装 keepalived
> yum install keepalived -y
> #2.keepalived.conf 文件
> 安装之后，在 etc 里面生成目录 keepalived，有文件 keepalived.conf
> #3.修改配置文件
>
> 105 主服务器
>
> ![23](./images/23.png)
>
> 102 副服务器
>
> ![24](./images/24.png)
>
> #4. 启动 keepalived
>
> ![25](./images/25.png)
>
> #5.测试
>
> ![26](./images/26.png)
>
> ![27](./images/27.png)

#### 6.2 Keeplived+Nginx 高可用集群（双主模式）

![28](./images/28.png)

修改配置

![graphic](./images/graphic.png)

配置 LB-02 节点

![graphic2](./images/graphic2.png)
