---
title: docker-machine命令总结
date: 2021-07-05
category:
  - container
tag:
  - docker
  - docker-machine
---

## 概述

Docker Machine 是一种可以让您在虚拟主机上安装 Docker 的工具,并可以使用 docker-machine 命令来管理主机。 命令有很多，现总结如下。

## env

```bash
docker-machine env machine_name
eval "$(docker-machine env machine_name)"
eval "$(docker-machine env -u)"
```

## create

```bash
docker-machine create -d virtualbox machine_name
```

## start

```bash
docker-machine start machine_name
```

## restart

```bash
docker-machine restart machine_name
```

## stop

```bash
docker-machine stop machine_name
```

## kill

```bash
docker-machine kill machine_name
```

## rm

```bash
docker-machine rm machine_name
```

## config

```bash
docker-machine config machine_name
```

## inspect

```bash
docker-machine inspect machine_name
```

## ssh

```bash
docker-machine ssh machine_name
```

## scp

```bash
docker-machine scp machine_name:file_name new_file_name
docker-machine scp file_name machine_name:new_file_name
```

## status

```bash
docker-machine status machine_name
```

## regenerate-certs

```bash
docker-machine regenerate-certs machine_name
```

## url

```bash
docker-machine url machine_name
```

## ip

```bash
docker-machine ip machine_name
```

## upgrade

```bash
docker-machine upgrade machine_name
```

## mount

```bash
docker-machine mount machine_name:remote_directory local_directory
```

## provision

```bash
docker-machine provision machine_name
```

## ls

```bash
docker-machine ls
```

## active

```bash
docker-machine active
```
