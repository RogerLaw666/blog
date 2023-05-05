---
title: windows11取消鼠标右键菜单折叠
date: 2022-11-18
category:
  - system
tag:
  - windows
---

## 概述

在 windows 11 中默认增加了菜单折叠的功能，这使得一部分同学非常不习惯，想要使菜单不折叠请执行下面的步骤。

## 解决方案

- 1. 以管理员的身份打开 cmd

- 2. 执行下面的命令

```cmd
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```

- 3. 重启电脑
