---
title: ffprobe的基本使用
date: 2022-06-09
category:
  - commandline
tag:
  - ffprobe
  - ffmpeg
---

## 概述

ffprobe 可以从媒体流收集媒体信息，并打印出开发人员可以读的格式，也可以把 ffprobe 理解为流媒体的分析工具。

使用 ffprobe 可以查看流媒体中包含的容器，以及容器中包含的流媒体的格式和类型。

## 用法

ffprobe [options] [input_url]

## 命令

### 查看帮助信息

```bash
ffprobe -h
```

### 查看版本

```bash
ffprobe -version
```

### 查看编译配置

```bash
ffprobe -buildconf
```

### 隐藏 banner

```bash
ffprobe -hide_banner
```

### 显示输入多媒体流的容器格式信息

```bash
ffprobe -show_format
```

### 显示输入多媒体流中每一个包的信息

```bash
ffprobe -show_packets
```

### 显示输入多媒体流中的每一帧以及字幕的信息

```bash
ffprobe -show_frames
```

### 显示输入多媒体流中每一个流的信息

```bash
ffprobe -show_streams
```

### 显示输入多媒体流中程序以及它们的流的信息

```bash
ffprobe -show_programs
```

### 显示格式中存储的章节信息

```bash
ffprobe -show_chapters
```
