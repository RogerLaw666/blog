---
title: windows下将capslock键映射成ctrl键
date: 2022-11-18
category:
  - system
tag:
  - windows
---

## 概述

对于程序员同学来说，capslock 键的使用频率非常低，而 ctrl 键的使用频率非常高，而手指按 capslock 键的位置又很轻松，因此会产生将 capslock 键映射成 ctrl 键的需求。下面来看看在 windows 系统下映射的具体方法。

## 解决方案

- 1. 新建一个文本文档，填入如下内容

```reg
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout]
"Scancode Map"=hex:00,00,00,00,00,00,00,00,02,00,00,00,1d,00,3a,00,00,00,00,00
```

- 2. 保存后关闭，并将该文本文档的扩展名修改为.reg 后双击执行

- 3. 重启电脑

如果觉得不习惯，下面是还原的注册表脚本。

```reg
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout]
"Scancode Map"=-
```
