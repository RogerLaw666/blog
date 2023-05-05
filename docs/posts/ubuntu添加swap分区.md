---
title: ubuntu添加swap分区
date: 2021-07-04
category:
  - system
tag:
  - linux
  - ubuntu
  - swap
---

## 概述

swap 分区是磁盘上的一个特殊用途的分区。是当系统的物理内存不够用的时候，把物理内存中的一部分空间释放出来，以供当前运行的程序使用。那些被释放的空间可能来自一些很长时间没有什么操作的程序，这些被释放的空间被临时保存到 swap 分区中，等到那些程序要运行时，再从 swap 分区中恢复保存的数据到内存中。
分配太多的 swap 空间，会浪费磁盘空间，而 swap 空间太少，则系统会发生错误。一般在内存小于 2G 的情况下，交换分区应为内存的 2 倍。

## 添加

```bash

// 查看内存情况
free -m
// 查看是否存在swap分区
swapon -s
// 分配8G的swap空间
sudo fallocate -l 8G /swapfile
// 查看是否分配成功
ls -lh /swapfile

// 设置权限
sudo chmod 600 /swapfile
// 挂载swap分区
sudo mkswap /swapfile
// 启用swap分区
sudo swapon /swapfile
// 查看是否存在swap分区
swapon -s
// 持久化swap分区
echo '/swapfile none swap sw 0 0'|sudo tee -a /etc/fstab
// 或者
sudo bash -c "echo '/swapfile none swap sw 0 0'>>/etc/fstab"
```

## 删除

```bash
sudo swapoff /swapfile
sudo rm /swapfile
sudo sed -i '/swapfile/d' /etc/fstab
```
