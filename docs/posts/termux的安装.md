---
title: termux的安装
date: 2021-07-04
category:
  - tool
tag:
  - android
  - termux
---

## 概述

Termux 是 Android 平台上的一个终端模拟器，它将众多 Linux 上运行的软件和工具近乎完美的移植到了手机端。 无需任何复杂的安装和配置过程，软件装好以后即会自动配置一个基本的运行环境，用以执行一些常见的 Linux 命令。 最为关键的是，它还内置了功能健全的包管理工具，可以使用类似于 Ubuntu 系统的 apt （或 pkg）命令安装额外的软件包。

## 安装

```bash
// 修改源
termux-change-repo
// 打开存储权限
termux-setup-storage
// 更新
apt update && apt upgrade
// 安装neovim
apt install neovim
// 设置默认editor
export EDITOR=nvim
// 安装openssh，之后使用sshd命令暴露8022端口
apt install openssh
// 安装ohmyzsh(https://github.com/4679/oh-my-termux)
bash -c "$(curl -fsSL https://git.io/oh-my-termux)"
```
