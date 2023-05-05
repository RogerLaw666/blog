---
title: linux中的ip命令总结
date: 2021-05-07
category:
  - commandline
tag:
  - ip
---

## 概述

linux 中的 ip 命令总结。

## addr

```bash
ip addr
ip a
ip addr add 192.168.0.1/24 dev eth0
```

## link

```bash
ip link
ip l
ip link set dev eth0 up
ip link set dev eth0 down
ip link set dev eth0 mtu 1500
```

## route

```bash
ip route
ip r
```

## netns

```bash
ip netns
```
