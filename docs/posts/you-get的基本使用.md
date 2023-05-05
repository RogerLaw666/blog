---
title: you-get的基本使用
date: 2022-06-08
category:
  - tool
tag:
  - you-get
  - ffmpeg
---

## 概述

you-get 是一个跨平台命令行视频、音频与图像下载工具，支持国内外常用的各种多媒体网站。有了它，看 B 站再也不用等待了。

下面是 macos 平台的使用方式，其他平台请查看官网。

## 安装 brew

假设你已经知道。

## 安装 you-get

```bash
brew install you-get
```

### 安装 ffmpeg

```bash
brew install ffmpeg
```

## 使用 you-get

### 查看视频格式信息

```bash
you-get -i 视频链接
```

### 选择视频的格式进行下载

查询后得到视频的多种 format 格式，可以选择一种格式下载。

如果不指定 format，则按照最高品质下载。

下载下来的 xml 文件是弹幕，直接无视掉吧。

```bash
you-get --format=dash-flv720 视频网址
```

### 选择视频下载保存的文件夹

```bash
you-get -o 文件夹位置 视频网址
```

### 下载一个列表的全部视频

```bash
you-get --playlist 视频网址
```

### 结合一起使用

```bash
you-get –format=dash-flv720 -o ~/Downloads –playlist 视频网址
```
