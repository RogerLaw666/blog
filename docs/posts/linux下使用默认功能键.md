---
title: linux下使用默认功能键
date: 2022-11-08
category:
  - tool
tag:
  - keyboard
---

## 概述

在 linux 下，如果使用的是类似苹果键盘，并且希望默认是 F1-F12(禁用 Fn 的默认行为)，那么可以进行如下设置。

## 解决方案

### 临时

```bash
echo 2 | sudo tee /sys/module/hid_apple/parameters/fnmode
```

### 永久

```bash
echo options hid_apple fnmode=2 | sudo tee -a /etc/modprobe.d/hid_apple.conf
sudo update-initramfs -u -k all
sudo reboot
```
