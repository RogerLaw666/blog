---
title: imac安装linux mint后调整亮度的方法
date: 2022-12-07
category:
  - system
tag:
  - linux
  - macos
---

## 概述

imac 在安装 linux mint 后，无法通过键盘调整显示器亮度，需要通过命令行的方式进行设置。

## 解决方案

```bash
# brightness的范围是0-255
brightness=100
echo brightness | sudo tee /sys/class/backlight/radeon_bl1/brightness
```
