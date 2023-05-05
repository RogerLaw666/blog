---
title: cmd的基本使用
date: 2020-11-29
category:
  - commandline
tag:
  - cmd
---

## 概述

命令行（Command Processor）（CMD）是在 OS / 2 ， Windows CE 与 Windows NT 平台为基础的操作系统（包括 Windows 2000，Windows XP，Windows Vista，Windows Server 2003，Windows 7， Windows 8 ，Windows 8.1 ，Windows 10）下的“MS-DOS 方式”。一般 Windows 的各种版本都与其兼容，用户可以在 Windows 系统下运行 DOS 命令，中文版 Windows XP 中的命令提示符进一步提高了与 DOS 下操作命令的兼容性，用户可以在命令提示符直接输入中文调用文件。命令行功能多于 DOS。

## 进入文件夹

```cmd
cd $directory
```

## 进入磁盘

```cmd
cd c:
```

## 回到磁盘根

```cmd
cd \
```

## 列出当前文件夹

```cmd
dir
```

```cmd
ls
```

## 新建文件夹

```cmd
md $directory
```

## 删除文件夹

```cmd
rd $directory
```

## 新建文件

```cmd
echo nul>$file
```

```cmd
echo $content>$file
```

## 删除文件

```cmd
del $file
```

## 复制文件

```cmd
copy $source_file $target_file
```

## 查看文件内容

```cmd
type $file
```

## 查看文件类型

```cmd
file $file
```

## 从 cmd 打开图形界面

```cmd
start .

```

```cmd
start $file
```

## 清屏

```cmd
cls
```

## 退出

```cmd
exit
```
