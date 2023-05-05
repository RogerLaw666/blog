---
title: curl的基本使用
date: 2020-11-15
category:
  - commandline
tag:
  - curl
---

## 概述

curl - transfer a URL

cURL 是一个利用 URL 语法在命令行下工作的文件传输工具，1997 年首次发行。它支持文件上传和下载，所以是综合传输工具，但按传统，习惯称 cURL 为下载工具。cURL 还包含了用于程序开发的 libcurl。

cURL 支持的通信协议有 FTP、FTPS、HTTP、HTTPS、TFTP、SFTP、Gopher、SCP、Telnet、DICT、FILE、LDAP、LDAPS、IMAP、POP3、SMTP 和 RTSP。

curl 还支持 SSL 认证、HTTP POST、HTTP PUT、FTP 上传, HTTP form based upload、proxies、HTTP/2、cookies、用户名+密码认证(Basic, Plain, Digest, CRAM-MD5, NTLM, Negotiate and Kerberos)、file transfer resume、proxy tunneling。

## curl 的示例

### get 方法

```bash
# get
curl $url
```

### http 版本

```bash
# HTTP/1.0
curl -0 $url
# HTTP/1.1
curl -1 $url
```

### 返回压缩的格式

```bash
curl --compressed $url
```

### 用户代理

```bash
curl -A "I'm your father" $url
```

### 来源网址

```bash
curl -e $referer_url $url
```

### 发送 header 到服务器

```bash
curl -H 'Accept-Language: en-US' $url
```

### 保存至本地

```bash
curl -O $url
```

### 另存为本地某个文件

```bash
curl -o $save_to_file $url
```

### 发送 cookie

```bash
curl -b 'foo1=bar;foo2=bar2' $url
```

### 发送本地 cookie 文件到服务器

```bash
curl -b cookies.txt $url
```

### 获取服务器 cookie 并保存到本地

```bash
curl -c cookies.txt $url
```

### post 方法

```bash
curl -d 'name=roger＆age=18' -X POST $url
```

### 用 post 方法发送本地文件到服务器

```bash
curl -d '@data.txt' $url
```

### 用 get 方法发送数据到服务器

```bash
curl -G -d 'name=roger' -d 'age=18' $url
```

### 用指定方法发送数据

```bash
curl -X POST $url
```

### 发送文件到服务器

```bash
curl -F 'file=@photo.png;filename=me.png' $url
```

### 发送 json 到服务器

```bash
curl -d '{"name": "roger", "age": "18"}' -H 'Content-Type: application/json' $url
```

### 从服务器获取 header 和资源

```bash
curl -i $url
```

### 仅从服务器获取 header

```bash
curl -I $url
```

### 忽略 ssl

```bash
curl -k $url
```

### 跟随重定向

```bash
curl -L -d 'name=roger' $url
```

### 设置传输速度

```bash
curl --limit-rate 200k $url
```

### 静默模式

```bash
curl -s $url
```

### 显示错误信息

```bash
curl -S $url
```

### 登陆服务器

```bash
curl -u 'name:passwd' $url
```

### 冗余模式

```bash
curl -v $url
```

### 跟踪数据

```bash
curl --trace - $url
```

### 用代理发送数据

```bash
curl -x socks5://name:passwd@myproxy.com:8080 $url
```
