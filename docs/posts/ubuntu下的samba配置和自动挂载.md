---
title: ubuntu下的samba配置和自动挂载
date: 2020-12-27
category:
  - system
tag:
  - linux
  - ubuntu
  - samba
---

## 概述

Samba 是在 Linux 和 UNIX 系统上实现 SMB 协议的一个免费软件，由服务器及客户端程序构成。SMB（Server Messages Block，信息服务块）是一种在局域网上共享文件和打印机的一种通信协议，它为局域网内的不同计算机之间提供文件及打印机等资源的共享服务。SMB 协议是客户机/服务器型协议，客户机通过该协议可以访问服务器上的共享文件系统、打印机及其他资源。通过设置“NetBIOS over TCP/IP”使得 Samba 不但能与局域网络主机分享资源，还能与全世界的电脑分享资源。

## 安装 samba 服务

```bash
sudo apt install -y samba
```

## 配置 samba

```bash
sudo vi /etc/samba/smb.conf
```

```bash
[share]
   comment = share
   path = /home/roger
   create mask = 0755
   directory mask = 0755
   valid users = roger
   force user = roger
   force group = roger
   public = yes
   available = yes
   browseable = yes
   writable = yes
```

```bash
sudo smbpasswd -a roger
sudo systemctl restart smbd.service
```

## 开机自动挂载

```bash
sudo vi /etc/fstab
```

```bash
/dev/sda1 /home/roger/share ntfs defaults 0 0
```
