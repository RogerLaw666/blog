---
title: linux命名空间
date: 2021-04-25
category:
  - commandline
tag:
  - namespace
---

## 概述

linux 命名空间总结。

## add

```bash
ip netns add test1
```

## del

```bash
ip netns del test1
```

## list

```bash
ip netns list
```

## exec

```bash
ip netns exec test1 ip link
ip netns exec test1 ip link set dev lo up
```

## example

```bash
ip link add veth-test1 type veth peer name veth-test2
ip link set veth-test1 netns test1
ip link set veth-test2 netns test2
ip netns exec test1 ip addr add 192.168.1.1/24 dev veth-test1
ip netns exec test2 ip addr add 192.168.1.2/24 dev veth-test2
ip netns exec test1 ip link set dev veth-test1 up
ip netns exec test2 ip link set dev veth-test2 up
ip netns exec test1 ping 192.168.1.2
ip netns exec test2 ping 192.168.1.1

```
