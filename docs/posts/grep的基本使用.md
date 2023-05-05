---
title: grep的基本使用
date: 2020-11-04
category:
  - commandline
tag:
  - grep
---

## 概述

grep 命令用于查找文件里符合条件的字符串。

grep 指令用于查找内容包含指定的范本样式的文件，如果发现某文件的内容符合所指定的范本样式，预设 grep 指令会把含有范本样式的那一列显示出来。若不指定任何文件名称，或是所给予的文件名为 -，则 grep 指令会从标准输入设备读取数据。

grep 在 man 手册中的介绍是 print lines that match patterns。

## grep 的示例

### 加入颜色区分匹配的内容

```bash
grep --color $something $path
```

### 排除匹配的内容

#### 排除单个

```bash
grep -v $something $path
```

#### 排除多个

```bash
grep -vE "$something|$another" $path
```

#### 排除空格

```bash
grep [^[:space:]] $something $path
```

### 对结果显示行号

```bash
grep -n $something $path
```

### 忽略大小写

```bash
grep -i $something $path
```

### 仅显示匹配的内容

```bash
grep -o $something $path
```

### 递归搜索

```bash
grep -R $something $path
```

### 仅显示匹配的文件名

```bash
grep -l $something $path
```

### 静默搜索

用于只需要执行正确与否的结果时。

```bash
grep -q $something $path
```

### 锚定单词

```bash
grep '\<world\>' $path
grep '\bworld\b' $path
```

### 显示匹配的内容前后部分

#### 显示匹配的内容后几行

```bash
grep -A $num_of_lines $something $path
```

#### 显示匹配的内容前几行

```bash
grep -B $num_of_lines $something $path
```

#### 显示匹配的内容前后各几行

```bash
grep -C $num_of_lines $something $path
```
