---
title: docker填坑总结
date: 2021-04-30
category:
  - container
tag:
  - docker
---

## 概述

在使用 docker 的过程中，难免会踩到一些坑，为了以后遇到问题时能快速定位到问题的原因，在此总结如下。

## ARG 设置 ENV 无效的原因：ARG 的作用范围

```bash
ARG var=test
FROM $docker_image
ENV variable=$var
```

上面的 Dockerfile 里设置了 ARG，也传递给了 ENV，可是在容器中 env 中的 variable 却是空。这是因为 ARG 指令有生效范围，如果在 FROM 指令之前指定，那么只能用于 FROM 指令中。

因此需要修改 Dockerfile 为如下:

```bash
FROM $docker_image
ARG var=test
ENV variable=$var
```

## 使用 docker run 打印环境变量

本地和容器内都定义了 var 的环境变量，如何通过 docker run 命令获取容器内的环境变量呢。

```bash
export $var=local
```

错误方法:

```bash
docker run $docker_image echo $var
```

结果是 local，获取的是本地环境变量。

正确方法应该是:

```bash
docker run $docker_image bash -c 'echo $var'
docker run $docker_image bash -c "echo \$var"
```
