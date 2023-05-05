---
title: awk的基本使用
date: 2020-11-03
category:
  - commandline
tag:
  - awk
---

## 概述

AWK - pattern scanning and text processing language

AWK 是一种处理文本文件的语言，是一个强大的文本分析工具。

之所以叫 AWK 是因为其取了三位创始人 Alfred Aho，Peter Weinberger, 和 Brian Kernighan 的 Family Name 的首字符。

## awk 的语法格式

### program: PATTERN{ACTION STATEMENTS}

- 语句之间用分号分隔
- print, printf

### 选项

- -F: 指明输入时用到的字段分隔符
- -v: var=value: 自定义变量

## awk 的具体语法

### print

#### print 的语法

print item1, item2, ...

#### print 的要点

- 逗号分隔符
- 输出的各 item 可以字符串，也可以是数值，当前记录的字段、变量或 awk 的表达式
- 如省略 item，相当于 print \$0

### 变量

#### 内建变量

- FS: input field seperator，默认为空白字符

  ```bash
  awk -v FS=':' '{print $1}' /etc/passwd
  ```

- OFS: output field seperator，默认为空白字符

  ```bash
  awk -v OFS='-' '{print $1}' /etc/passwd
  ```

- RS: input record seperator，输入时的换行符

  ```bash
  awk -v RS='\r\n' '{print $0}' /etc/passwd
  ```

- ORS: output record seperator，输出时的换行符

  ```bash
  awk -v ORS='-----' '{print $0}' /etc/passwd
  ```

- NF: number of field，字段数量
  - {print NF}: 每行的字段数量
  - {print \$NF}: 每行的最后一个字段
- NR: number of record, 行数

  ```bash
  awk '{print NR,$0}' /etc/passwd /etc/issue
  ```

- FNR: 各文件分别计数，行数

  ```bash
  awk '{print FNR,$0}' /etc/passwd /etc/issue
  ```

- FILENAME: 当前文件名

  ```bash
  awk '{print FILENAME,$0}' /etc/passwd
  ```

- ARGC: 命令行参数的个数

  ```bash
  # 2
  awk 'BEGIN{print ARGC}' /etc/passwd
  ```

- ARGV: 数组，保存的是命令行所给定的各参数

  ```bash
  # awk, /etc/passwd
  awk 'BEGIN{print ARGV[0]}' /etc/passwd
  awk 'BEGIN{print ARGV[1]}' /etc/passwd
  ```

#### 自定义变量

- -v var=value

  ```bash
  awk -v MY_NAME='roger' 'BEGIN {print MY_NAME}'
  ```

  - 变量名区分字符大小写

- 在 program 中直接定义

  ```bash
  awk 'BEGIN{MY_NAME="roger";print MY_NAME}'
  ```

### printf 命令

#### printf 的语法

printf FORMAT, item1, item2, ...

#### printf 的要点

- FORMAT 必须给出
- 不会自动换行，需要显式给出换行控制符，\n
- FORMAT 中需要分别为后面的每个 item 指定一个格式化符号
- 格式符:

  - %c: 显示字符的 ASCII 码
  - %d, %i: 显示十进制整数
  - %e, %E: 科学计数法数值显示
  - %f: 显示为浮点数
  - %g, %G: 以科学计数法或浮点形式显示数值
  - %s: 显示字符串
  - %u: 无符号整数
  - %%: 显示%自身

  ```bash
  awk 'BEGIN{printf "%s\n","roger"}' /etc/passwd
  ```

- 修饰符:

  - #[.#]: 第一个数字控制显示的宽度，第二个#表示小数点后的精度
    - %3.1f
  - -: 左对齐
  - +: 显示数值的符号

  ```bash
  awk -F ':' '{printf "username: %15s\n",$1}' /etc/passwd
  ```

### 操作符

#### 算术操作符

- x+y, x-y, x\*y, x/y, x^y, x%y
- -x
- +x: 转换为数值

#### 字符串操作符

没有符号的操作符，字符串连接。

#### 赋值操作符

- =, +=, -=, \*=, /=, %=, ^=
- ++, --

#### 比较操作符

- \>, >=, <, <=, !=, ==

#### 模式匹配符

- ~: 是否匹配
- !~: 是否不匹配

#### 逻辑操作符

- &&
- ||
- !

#### 函数调用

- function_name(argu1, argu2, ...)

#### 条件表达式

```bash
selector?if-true-expression:if-false-expression

awk -F: '{$3>=1000?usertype="Common User":usertype="Sysadmin or SysUser";printf "%15s:%-s\n",$1,usertype}' /etc/passwd
```

### 模式

#### empty

空模式，匹配每一行。

#### /regular expression/

仅处理能够被此处的模式匹配到的行。

```bash
awk '!/(^#|^$)/{print $0}' /etc/fstab
```

#### relational expression

关系表达式，结果有“真”有“假”，结果为“真”才会被处理。

真: 结果为非 0 值，非空字符串。

```bash
awk -F ':' '$3>=1000{print $0}' /etc/passwd
awk -F ':' '$NF~/\/bin\/bash$/{print $1,$NF}' /etc/passwd
```

#### line ranges: 行范围

- startline,endline: /pat1/,/pat2/
- 注意: 不支持直接给出数字的格式

```bash
awk -F: '(NR>=2&&NR<=10){print $1}' /etc/passwd
```

#### BEGIN/END 模式

- BEGIN{}: 仅在开始处理文件中的文本之前执行一次

  ```bash
  awk 'BEGIN{sum=0;for(i=0;i<=100;i++){sum+=i};print sum}'
  ```

- END{}: 仅在文本处理完成之后执行一次

  ```bash
  awk 'BEGIN{sum=0;for(i=0;i<=100;i++){sum+=i}}END{print sum}' /etc/passwd
  ```

### 常用的 action

- Expressions
- Control statements: if, while 等
- Compound statements: 组合语句
- input statements
- output statements

### 控制语句

```bash
  if(condition) {statments}
  if(condition) {statments} else {statements}
  while(conditon) {statments}
  do {statements} while(condition)
  for(expr1;expr2;expr3) {statements}
  break
  continue
  delete array[index]
  delete array
  exit
  { statements }
```

#### if-else

```bash
语法:if(condition) statement [else statement]

awk -f: '{if($3>=1000) {printf "common user: %s\n",$1} else {printf "root or sysuser: %s\n",$1}}' /etc/passwd
awk -f: '{if($NF=="/bin/bash") print $1}' /etc/passwd
awk '{if(NF>5) print $0}' /etc/fstab
df -h | awk -F% '/^\/dev/{print $1}' | awk '{if($NF>=20) print $1}'
```

使用场景: 对 awk 取得的整行或某个字段做条件判断。

#### while 循环

```bash
语法:while(condition) statement
```

条件“真”，进入循环，条件“假”，退出循环。

使用场景: 对一行内的多个字段逐一类似处理时使用，对数组中的各元素逐一处理时使用。

```bash
awk '/^[[:space:]]*linux16/{i=1;while(i<=NF) {print $i,length($i); i++}}' /etc/grub2.cfg
awk '/^[[:space:]]*linux16/{i=1;while(i<=NF) {if(length($i)>=7) {print $i,length($i)}; i++}}' /etc/grub2.cfg
```

#### do-while 循环

```bash
语法:do statement while(condition)
```

意义: 至少执行一次循环体。

#### for 循环

```bash
语法:for (expr1;expr2;expr3) statement

for(variable assignment;condition;iteration process) {for-body}

awk '/^[[:space:]]*linux16/{for(i=1;i<=NF;i++) {print $i,length($i)}}' /etc/grub2.cfg
```

特殊用法: 能够遍历数组中的元素。

```bash
语法:for(var in array) {for-body}
```

#### switch 语句

```bash
语法:switch(expression) {case value1 or /regexp/: statement; case value2 or /regexp2/: statement; ...; default: statement}
```

#### break 和 continue

```bash
  break [n]
  continue
```

#### next

提前结束对本行的处理而直接进入下一行。

```bash
  awk -F: '{if($3%2!=0) next; print $1,$3}' /etc/passwd
```

### 数组

#### 关联数组: array[index-expression]

其中 index-expression 需要注意的地方:

- 可使用任意字符串，字符串要使用双引号
- 如果某数组元素事先不存在，在引用时，awk 会自动创建此元素，并将其值初始化为“空串”
- 若要判断数组中是否存在某元素，要使用"index in array"格式进行
- weekdays["mon"]="Monday"

若要遍历数组中的每个元素，要使用 for 循环:

```bash
for(var in array) {for-body}

awk 'BEGIN{weekdays["mon"]="Monday";weekdays["tue"]="Tuesday";for(i in weekdays) {print weekdays[i]}}'

awk 'BEGIN{arr["a"]=1;arr["b"]=2;for (a in arr) {print a}}'
```

注意 : var 会遍历 array 的每个索引。

```bash
  state["LISTEN"]++
  state["ESTABLISHED"]++

  netstat -tan | awk '/^tcp\>/{state[$NF]++}END{for(i in state) {print i,state[i]}}'

  awk '{ip[$1]++}END{for(i in ip) {print i,ip[i]}}' /var/log/httpd/access_log
```

#### 练习

- 统计/etc/fstab 文件中每个文件系统类型出现的次数

  ```bash
  awk '/^UUID/{fs[$3]+ + }END{for (i in fs) {pr i nt i,fs[i]} } ' /etc/fstab
  ```

- 统计指定文件中每个单词出现的次数

  ```bash
  awk '{for(i=1;i<=NF;i++){count[$i]++}}END{for(i in count) {print i,count[i]}}' /etc/fstab
  ```

### 函数

函数有内置函数和自定义函数之分。

#### 内置函数

- 数值处理:
  - rand(): 返回 0 和 1 之间一个随机数
- 字符串处理:

  - length([s]): 返回指定字符串的长度
  - sub(r,s,[t]): 以 r 表示的模式来查找 t 所表示的字符中的匹配的内容，并将其第一次出现替换为 s 所表示的内容
  - gsub(r,s,[t]): 以 r 表示的模式来查找 t 所表示的字符中的匹配的内容，并将其所有出现均替换为 s 所表示的内容
  - split(s,a[,r]): 以 r 为分隔符切割字符 s，并将切割后的结果保存至 a 所表示的数组中，以下标 1 为第一个元素

  ```bash
  netstat -tan | awk '/^tcp\>/{split($5,ip,":");count[ip[1]]++}END{for (i in count) {print i,count[i]}}'
  ```

#### 自定义函数

## awk 的示例

### 读取外部执行命令的文件来执行命令

```bash
awk -f $path_to_script_file $path_to_file
```

### 打印特定行

```bash
awk '{if(NR>=1 && NR<=5) print $0}' $path_to_file
```

### 指定分隔符

```bash
awk -F ':' '{print $1}' $path_to_file
awk -v FS=':' '{print $1}' $path_to_file
awk -v FS=':' -v OFS='-' '{print $1}' $path_to_file
```

### 开始和结束脚本

```bash
awk 'BEGIN {FS=":"} END {print "end"} {print $1}' $path_to_file
```

### 获取 shell 命令参数

```bash
awk 'BEGIN {"'$1'"}' $path_to_file
```
