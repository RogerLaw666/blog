---
title: 解决Linux+Windows双系统时间不一致问题
date: 2022-12-19
category:
  - system
tag:
  - linux
  - windows
---

## 概述

想在保留 Windows 系统的前提下尝试其他 Linux 发行版，双启动是个常用的做法。这种方法如此风行是因为实现双启动是一件很容易的事情，然而这也带来了一个大问题，那就是 时间。

若你只是用一个操作系统，时间同步不会有什么问题。但若有 Windows 和 Linux 两个系统，则可能出现时间同步上的问题。Linux 使用的是 UTC 时间而 Windows 使用的是本地时间。当你从 Linux 切换到 Windows 或者从 Windows 切换到 Linux 时，就可能显示错误的时间了。

## 解决方案

让 windows 使用 UTC 时间，而不是本地时间。

以管理员身份运行 cmd，复制并粘贴下面的命令:

```cmd
reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f
```
