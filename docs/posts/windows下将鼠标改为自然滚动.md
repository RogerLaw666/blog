---
title: windows下将鼠标改为自然滚动
date: 2022-11-18
category:
  - system
tag:
  - windows
---

## 概述

windows 的鼠标滚动方向和 mac 的是相反的，个人还是比较习惯 mac 的自然滚动方式，而 windows 又不提供鼠标滚动方向的修改，下面记录下怎么将 windows 的鼠标滚动改成自然滚动。

## 解决方案

- 1. 计算机-右键-管理-系统工具-设备管理器-鼠标和其他指针设备-（或者控制面板，硬件，设备，鼠标）打开鼠标的属性-详细信息-属性-设备实例路径

一般为 HID\VID\_\*\\\*，3 个部分组成。

- 2. regedit 打开注册表，依次按下面的步骤展开注册表

HKEY_LOCAL_MACHINE \ SYSTEM - CurrentControlSet \ Enum \ ??? \ ??? \ ??? \ Device Parameters

选中 Device Parameters 并在右边找到 FlipFlopWheel，字段默认 0，修改成 1 即可。

??? 对应设备实例路径（上面 3 部分的每一个部分）
