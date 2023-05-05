---
title: wget的基本使用
date: 2020-11-15
category:
  - commandline
tag:
  - wget
---

## 概述

wget - the non-interactive network downloader

wget 是一个从网络上自动下载文件的自由工具，支持通过 HTTP、HTTPS、FTP 三个最常见的 TCP/IP 协议 下载，并可以使用 HTTP 代理。"wget" 这个名称来源于 “World Wide Web” 与 “get” 的结合。

所谓自动下载，是指 wget 可以在用户退出系统的之后在继续后台执行，直到下载任务完成。

## wget 的示例

### 下载文件

```bash
wget $url
```

### 获取内容

```bash
# 类似 curl $url
wget -O - -q $url
```

### 下载文件另存为本地某个文件

```bash
wget -O $path_to_file $url
```

### 保存日志

```bash
wget -o $log_url $url
```

### 静默模式

```bash
wget -q $url
```

### 后台运行

```bash
wget -b $url
```

### 断点续传

```bash
wget -c $url
```

### 读取本地文件中的 url 作为输入

```bash
wget -i $path_to_file
```

### 递归模式

```bash
wget -r $url
```
