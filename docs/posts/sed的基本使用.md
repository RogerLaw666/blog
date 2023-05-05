---
title: sed的基本使用
date: 2020-11-03
category:
  - commandline
tag:
  - sed
---

## 概述

sed 命令是利用脚本来处理文本文件。

sed 可依照脚本的指令来处理、编辑文本文件。

sed 主要用来自动编辑一个或多个文件、简化对文件的反复操作、编写转换程序等。

sed 在 man 手册中的介绍是 stream editor for filtering and transforming text。

## sed 的参数

- -n 不输出模式空间中的内容至屏幕
- -e script, --expression=script: 多点编辑
- -f /PATH/TO/SED_SCRIPT_FILE: 每行一个编辑命令
- -r --regexp-extended: 支持使用扩展正则表达式
- -i [SUFFIX], --in-place[=SUFFIX]: 直接编辑原文件

### sed 的地址

- 空地址: 对全文进行处理
- 单地址:
  - line_number: 指定行
  - /pattern/: 被此模式所匹配到的每一行
- 地址范围
  - line_number1,line_number2:
  - line_number,+num_of_lines:
  - line_number，/pattern/
  - /pattern1/,/pattern2/
  - \$: 最后一行
- 步进: ~
  - 1~2:所有奇数行
  - 2~2:所有偶数行

### sed 的命令

- d: 删除
- p: 显示模式空间中的内容
- a \text: 在行后面追加文本“text”，支持使用\n 实现多行追加
- i \text: 在行前面插入文本“text”，支持使用\n 实现多行插入
- c \text: 把匹配到的行替换为此处指定的文本“text”
- w /PATH/TO/SOMEFILE: 保存模式空间匹配到的行至指定的文件中
- r /PATH/FROM/SOMEFILE: 读取指定文件的内容至当前文件被模式匹配到的行后面，文件合并
- =: 为模式匹配到的行打印行号
- !: 条件取反，/pattern/!d，除了 pattern 之外的行都删除
- s///: 查找替换，其分隔符可自行指定，常用的有 s@@@, s###等
  - 替换标记:
    - g: 全局替换
    - w /PATH/TO/SOMEFILE: 将替换成功的结果保存至指定文件中
    - p: 显示替换成功的行
  - &: sed 's/int/&eger/g' path_to_file

## sed 的高级使用

- h: 把模式空间中的内容覆盖至保持空间中
- H: 把模式空间中的内容追加至保持空间中
- g: 把保持空间中的内容覆盖至模式空间中
- G: 把保持空间中的内容追加至模式空间中
- x: 把模式空间中的内容与保持空间中的内容互换
- n: 覆盖读取匹配到的行的下一行至模式空间中
- N: 追加读取匹配到的行的下一行至模式空间中
- d: 删除模式空间中的行
- D: 删除多行模式空间中的所有行

## sed 的示例

### 抑制模式空间的自动打印

```bash
sed -n "/$pattern/p" $path_to_file
sed -n "/$pattern/,/$pattern/p" $path_to_file
sed -n "${line_num}p" $path_to_file
sed -n "$from_line_num,${to_line_num}p" $path_to_file
```

### 删除包含匹配的行

```bash
sed "${line_num}d" $path_to_file
sed "/$pattern/d" $path_to_file
```

### 插入和替换行

#### 在匹配的行前面插入

```bash
sed "${line_num}a\ $something" $path_to_file
sed "/$pattern/a $something" $path_to_file
```

#### 在匹配的行后面插入

```bash
sed "${line_num}i\ $something" $path_to_file
sed "/$pattern/i\ $something" $path_to_file
```

#### 替换匹配的行

```bash
sed "${line_num}c\ $something" $path_to_file
sed "/$pattern/c\ $something" $path_to_file
```

### 插入外部文件中的内容到指定位置

#### 每行插入

```bash
sed "r $file" $path_to_file
```

#### 指定行插入

```bash
sed "${line_num}r $file" $path_to_file
```

#### 从开始行到结束行之间都插入

```bash
sed "$from_line_num, ${to_line_num}r $file" $path_to_file
```

### 保存结果到新文件

```bash
sed -n "/$pattern/w $new_file" $path_to_file
```

### 替换

#### 每行替换

```bash
sed "s/$pattern/$something/g" $path_to_file
```

#### 匹配后替换

```bash
sed "${line_num}s/$pattern/$something/g" $path_to_file
sed "/$pattern/s/$pattern/$something#gi" $path_to_file
```

### 使用扩展的正则表达式

```bash
sed -r /$pattern/p $path_to_file
sed -E /$pattern/p $path_to_file
```

### 对每行执行多次命令

```bash
sed -e "1i $something" -e "1a $something" $path_to_file
```

### 读取外部执行命令的文件来执行命令

```bash
sed -f $path_to_script_file $path_to_file
```

### 引用匹配后所有的部分使用&

```bash
sed 's/l..k/&r/g' $path_to_file
```

### 引用匹配后限定的部分使用\num

```bash
sed 's/\(l..k\) this/\1r/g' $path_to_file
```
