---
title: docker基础教程2 - 安装
date: 2022-06-03
category:
  - container
tag:
  - docker
prev: docker基础教程1 - 简介
next: docker基础教程3 - 常用命令
---

## 二、Docker 安装

### 2.1 前提说明

#### 2.1.1 **CentOS Docker** **安装**

![13](./images/13.png)

#### 2.1.2 前提条件

目前，CentOS 仅发行版本中的内核支持 Docker。Docker 运行在 CentOS 7（64-bit）上，要求系统为 64 位，Linux 系统内核版本为 3.8 以上，这里选用 Centos7.x

#### 2.1.3 查看自己的内核

uname 命令用于打印当前系统相关信息（内核版本号，硬件架构，主机名称和操作系统类型等）。

![14](./images/14.png)

### 2.2 Docker 的基本组成

#### 2.2.1 镜像（image）

Docker 镜像（Image）就是一个 **只读** 的模板。镜像可以用来创建 Docker 容器， 一个镜像可以创建很多容器 。

它也相当于是一个 root 文件系统。比如官方镜像 centos:7 就包含了完整的一套 centos:7 最小系统的 root 文件系统。

相当于容器的“源代码”， docker 镜像文件类似于 Java 的类模板，而 docker 容器实例类似于 java 中 new 出来的实例对象。

#### 2.2.2 容器（container）

- 从面向对象角度

Docker 利用容器（Container）独立运行的一个或一组应用，应用程序或服务运行在容器里面，容器就类似于一个虚拟化的运行环境， 容器是用镜像创建的运行实例 。就像是 Java 中的类和实例对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器为镜像提供了一个标准的和隔离的运行环境 ，它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台

- 从镜像容器角度

**可以把容器看做是一个简易版的** **\*Linux\*** **环境** （包括 root 用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。

#### 2.2.3 仓库（repository）

仓库（Repository）是 集中存放镜像 文件的场所。

类似于

Maven 仓库，存放各种 jar 包的地方；

github 仓库，存放各种 git 项目的地方；

Docker 公司提供的官方 registry 被称为 Docker Hub，存放各种镜像模板的地方。

仓库分为公开仓库（Public）和私有仓库（Private）两种形式。

最大的公开仓库是 Docker Hub(<https://hub.docker.com/>) ，

存放了数量庞大的镜像供用户下载。国内的公开仓库包括阿里云 、网易云等

#### 2.2.4 小总结

- 需要正确的理解仓库/镜像/容器这几个概念:

Docker 本身是一个容器运行载体或称之为管理引擎。我们把应用程序和配置依赖打包好形成一个可交付的运行环境，这个打包好的运行环境就是 image 镜像文件。只有通过这个镜像文件才能生成 Docker 容器实例(类似 Java 中 new 出来一个对象)。

image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

- 镜像文件

image 文件生成的容器实例，本身也是一个文件，称为镜像文件。

- 容器实例

一个容器运行一种服务，当我们需要的时候，就可以通过 docker 客户端创建一个对应的运行实例，也就是我们的容器 。

- 仓库

就是放一堆镜像的地方，我们可以把镜像发布到仓库中，需要的时候再从仓库中拉下来就可以了。

### 2.3 Docker 平台架构图解（入门版）

![15](./images/15.png)

#### 2.3.1 Docker 工作原理

Docker 是一个 Client-Server 结构的系统，Docker 守护进程运行在主机上， 然后通过 Socket 连接从客户端访问，守护进程从客户端接受命令并管理运行在主机上的容器 。 容器，是一个运行时环境，就是我们前面说到的集装箱。可以对比 mysql 演示对比讲解

![16](./images/16.png)

#### 2.3.2 整体架构及底层通信原理简述

Docker 是一个 C/S 模式的架构，后端是一个松耦合架构，众多模块各司其职

#### 2.3.3 Docker 运行的基本流程为

1. 用户是使用 Docker Client 与 Docker Daemon 建立通信，并发送请求给后者。
2. Docker Daemon 作为 Docker 架构中的主体部分，首先提供 Docker Server 的功能时期可以接受 Docker Client 的请求。
3. Docker Engine 执行 Docker 内部的一些列工作，每一项工作都是以一个 Job 的形式的存在。
4. Job 的运行过程中，当需要容器镜像是，则从 Docker Register 中下载镜像，并通过镜像管理驱动 Graph driver 将下载镜像以 Graph 的形式存储。
5. 当需要为 Docker 创建网络环境时，通过网络驱动 Network driver 创建并配置 Docker 容器网络环境。
6. 当需要限制 Docker 容器运行资源或执行用户指令等操作时，则通过 Exec driver 来完成。
7. Libcontainer 是一项独立的容器管理包，Network driver 以及 Exec driver 都是通过 Libcontainer 来实现具体容器进行的操作。

![17](./images/17.png)

![18](./images/18.png)

### 2.4、安装步骤

#### 2.4.1 CentOS7 安装 Docker

- 1. 确定你是 CentOS7 以上版本

```bash
# 查看CentOS版本命令
cat /etc/redhat-release
```

- 2. 卸载旧版本

  ![19](./images/19.png)

```bash
# 卸载旧版本docker命令
$ sudo yum remove docker \
         docker-client \
         docker-client-latest \
         docker-common \
         docker-latest \
         docker-latest-logrotate \
         docker-logrotate \
         docker-engine
```

- 3. yum 安装 gcc 相关命令

```bash
# yum安装gcc相关命令
yum -y install gcc
yum -y install gcc-c++
```

- 4. 安装需要的软件包

  ![20](./images/20.png)
  **使用存储库安装**

```bash
# 在新主机上首次安装Docker Engine之前，您需要设置Docker存储库。之后，您可以从存储库安装和更新Docker
# 设置存储库
# 安装 yum-utils 包（提供yum-config-manager 实用程序）并设置稳定的存储库
# 官网要求
yum install -y yum-utils
```

- 5. 设置 stable 镜像仓库

  ![21](./images/21.png)

```bash
# 推荐使用 使用阿里的 docker 镜像仓库，国外的镜像仓库是比较慢的
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

- 6. 更新 yum 软件包索引

```bash
# 更新yum软件包索引
yum makecache fast
```

- 7. 安装 DOCKER CE 引擎

```bash
# 命令
yum -y install docker-ce docker-ce-cli containerd.io
```

- 8. 启动 docker

```bash
# 启动命令
systemctl start docker
```

- 9. 测试

```bash
# 测试
docker version

docker run hello-world
```

![22](./images/22.png)

- 10. 卸载

```bash
# 卸载命令
systemctl stop docker
yum remove docker-ce docker-ce-cli containerd.io
rm -rf /var/lib/docker
rm -rf /var/lib/containerd
```

### 2.5、阿里云镜像加速

### 2.5.1 是什么

- 地址：<https://promotion.aliyun.com/ntms/act/kubernetes.html>

- 注册一个属于自己的阿里云账户
- 获得加速器地址连接：

  1. 登陆阿里云开发者平台
  2. 点击控制台
  3. 选择容器镜像服务
  4. 获取加速器地址

- 粘贴脚本直接执行

```bash
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://aa25jngu.mirror.aliyuncs.com"]
}
EOF
```

![23](./images/23.png)

```bash
# 或者分开步骤执行
mkdir -p /etc/docker
vim /etc/docker/daemon.json
```

- 重启服务器

```bash
# 重启服务器
systemctl daemon-reload
systemctl restart docker
```

### 2.5.2 永远的 HelloWorld

启动 Docker 后台容器（测试运行 hello-world）

```bash
# 命令
docker run hello-world
```

![24](./images/24.png)

### 2.5.3 底层原理

为什么 Docker 会比 VM 虚拟机快:

(1)docker 有着比虚拟机更少的抽象层
    由于 docker 不需要 Hypervisor(虚拟机)实现硬件资源虚拟化,运行在 docker 容器上的程序直接使用的都是实际物理机的硬件资源。因此在 CPU、内存利用率上 docker 将会在效率上有明显优势。
(2)docker 利用的是宿主机的内核,而不需要加载操作系统 OS 内核
    当新建一个容器时,docker 不需要和虚拟机一样重新加载一个操作系统内核。进而避免引寻、加载操作系统内核返回等比较费时费资源的过程,当新建一个虚拟机时,虚拟机软件需要加载 OS,返回新建过程是分钟级别的。而 docker 由于直接利用宿主机的操作系统,则省略了返回过程,因此新建一个 docker 容器只需要几秒钟。

![25](./images/25.png)
