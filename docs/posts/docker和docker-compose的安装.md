---
title: docker和docker-compose的安装
date: 2020-11-21
category:
  - container
tag:
  - docker
---

## 概述

docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 Linux 或 Windows 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。

docker 在各个平台上都提供了安装，下面记录一下各平台的安装方式。

## 安装 docker

windows 和 macos 下安装 docker，可以直接下载官网的社区版进行安装。企业版强调安全性，是需要付费的。

ubuntu 下安装 docker，可以直接使用 apt 进行安装。

```bash
apt install -y docker.io
```

centos 下安装 docker，可以获取 docker 官网的脚本，并修改源为阿里云，以便加速安装。

```bash
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh --mirror Aliyun
```

安装完成后，设置开机启动。

```bash
sudo systemctl enable docker
```

接着启动 docker 进程。

```bash
sudo systemctl start docker
```

然后创建 docker 组，并将当前用户加入到这个组中，获取 docker 的权限，不然每次使用 docker 命令都需要加上 sudo。

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

为了加快拉取 docker 镜像的速度，接下来修改 docker 的镜像源。使用中科大或者阿里云的镜像源。阿里云的镜像地址需要到阿里云上注册账号，使用它的 docker 服务获取。

```bash
echo '{"registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]}'|sudo tee /etc/docker/daemon.json
```

docker 中默认 detachKeys 的前缀为 ctrl+p，这会使得原本在命令行中使用 ctrl+p 出现冲突，所以需要修改为其它快捷键。

```bash
mkdir ~/.docker
echo '{"detachKeys": "ctrl-q,q"}'>~/.docker/config.json
```

修改完成后，重启 docker 服务。

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

此时，有可能之前设置的还没有生效，退出用户登陆后重新登陆一次就可以了。

## 安装 docker-compose

windows 和 macos 在安装完 docker 后，docker-compose 就已经安装好了，无需额外安装。

ubuntu 下可以使用 apt 进行安装。

```bash
sudo apt install -y docker-compose
```

centos 下可以获取 docker-compose 的安装脚本进行安装。

```bash
curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` > ~/docker-compose && sudo mv ~/docker-compose /usr/bin && chmod +x /usr/bin/docker-compose
```
