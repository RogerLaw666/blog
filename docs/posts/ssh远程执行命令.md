---
title: ssh远程执行命令
date: 2021-04-25
category:
  - commandline
tag:
  - ssh
---

## 概述

ssh 为 Secure Shell 的缩写，是建立在应用层基础上的安全协议。ssh 是较可靠，专为远程登录会话和其他网络服务提供安全性的协议。利用 ssh 协议可以有效防止远程管理过程中的信息泄露问题。ssh 最初是 UNIX 系统上的一个程序，后来又迅速扩展到其他操作平台。

ssh 除了登录服务器等操作之外，也可以直接执行命令，它为我们自动化远程操作提供了强力的支持。

## 远程执行多行命令

```bash
ssh $username@$ip "command1;command2;command3"
```

## 远程执行交互命令

```bash
ssh $username@$ip -t "command"
```

## 远程执行命令传入变量

```bash
name=roger
ssh $username@$ip bash -c "'echo $name'"
```

## 远程执行本地脚本

```bash
ssh $username@$ip < local_script.sh
```

## 远程执行本地脚本带参数

```bash
ssh $username@$ip 'bash -s' < local_script.sh $param
```

## 远程执行远程脚本

```bash
ssh $username@$ip /home/roger # 必须绝对路径
```

## 远程执行远程脚本带参数

```bash
ssh $username@$ip /home/roger $param
```
