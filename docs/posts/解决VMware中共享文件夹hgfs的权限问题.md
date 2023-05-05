---
title: 解决VMware中共享文件夹hgfs的权限问题
date: 2022-07-15
category:
  - system
tag:
  - linux
  - ubuntu
---

## 概述

在 vmware 中的 ubuntu 共享了目录发现/mnt/hgfs 一直都是 root 权限，而且 hgfs 没有写的权限，导致很多问题。

## 解决方案

- 1. 如果之前已经挂载 hgfs，先取消挂载

```bash
sudo umount /mnt/hgfs
```

- 2. 重新挂载

```bash
sudo /usr/bin/vmhgfs-fuse .host:/ /mnt/hgfs -o allow_other -o uid=1000 -o gid=1000 -o umask=077
```

上面命令中的 uid 1000 和 gid 1000 需要根据用户 uid 和 gid 来决定，输入 id 命令即可查询。

umask 一般是 022，为了不让其他人访问，设置的 077。

- 3. 开机自动挂载

```bash
sudo vim /etc/fstab

.host:/ /mnt/hgfs fuse.vmhgfs-fuse allow_other,uid=1000,gid=1000,umask=077 0 0
```
