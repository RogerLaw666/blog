---
title: linux下解决默认没有声音的问题
date: 2022-11-08
category:
  - tool
tag:
  - sound
---

## 概述

在 linux 下发现没有声音，之前使用 windows 的时候都是正常的，这是为什么呢？

## 解决方案

通过命令 alsamixer 查看发现，Master,Headphone,Speaker 对应的声音是错误的。于是想到先手动调整到正确的设置，然后对设置进行保存，再在开机时恢复就可以了。

### 保存 alsamixer 设置

```bash
alsactl --file ~/.config/asound.state store
```

### 恢复 alsamixer 设置

```bash
alsactl --file ~/.config/asound.state restore
```
