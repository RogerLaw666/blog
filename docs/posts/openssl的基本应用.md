---
title: openssl的基本应用
date: 2020-11-05
category:
  - commandline
tag:
  - openssl
---

## 概述

在计算机网络上，OpenSSL 是一个开放源代码的软件库包，应用程序可以使用这个包来进行安全通信，避免窃听，同时确认另一端连接者的身份。这个包广泛被应用在互联网的网页服务器上。

SSL 是 Secure Sockets Layer（安全套接层协议）的缩写，可以在 Internet 上提供秘密性传输。Netscape 公司在推出第一个 Web 浏览器的同时，提出了 SSL 协议标准。其目标是保证两个应用间通信的保密性和可靠性,可在服务器端和用户端同时实现支持。已经成为 Internet 上保密通讯的工业标准。

SSL 能使用户/服务器应用之间的通信不被攻击者窃听，并且始终对服务器进行认证，还可选择对用户进行认证。SSL 协议要求建立在可靠的传输层协议(TCP)之上。SSL 协议的优势在于它是与应用层协议独立无关的，高层的应用层协议(例如：HTTP，FTP，TELNET 等)能透明地建立于 SSL 协议之上。SSL 协议在应用层协议通信之前就已经完成加密算法、通信密钥的协商及服务器认证工作。在此之后应用层协议所传送的数据都会被加密，从而保证通信的私密性。

<!--more -->

## 加密算法和协议

### 对称加密

加密和解密使用同一个密钥。

#### 对称加密的类型

- DES: Data Encryption Standard
- 3DES: Triple DES
- AES: Advanced Encryption Standard(128bits, 192bits, 256bits, 384bits)
- Blowfish
- Twofish
- IDEA
- RC6
- CAST5

#### 对称加密的特性

- 加密、解密使用同一个密钥
- 将原始数据分割成为固定大小的块，逐个进行加密

#### 对称加密的缺陷

- 密钥过多
- 密钥分发困难

### 公钥加密

密钥分为公钥与私钥。

#### 公钥加密的公钥

从私钥中提取产生，可公开给所有人，也叫 pubkey。

#### 公钥加密的私钥

通过工具创建，使用者自己留存，必须保证其私密性，也叫 secret key。

#### 公钥加密的特性

用公钥加密的数据，只能使用与之配对儿的私钥解密，反之亦然。

#### 公钥加密的用途

- 数字签名: 主要在于让接收方确认发送方的身份
- 密钥交换: 发送方用对方公钥加密一个对称密钥，并发送给对方
- 数据加密

#### 公钥加密的算法

RSA，DSA，ELGamal
DSS: Digital Signature Standard
DSA: Digital Signature Algorithm

### 单向加密

即提出数据指纹，只能加密，不能解密。

#### 单向加密的特性

定长输出、雪崩效应。

#### 单向加密的功能

验证数据的完整性。

#### 单向加密的算法

- md5: Message Digest 5, 128bits
- sha1: Secure Hash Algorithm 1, 160bits
- sha224
- sha256
- sha384
- sha512

### 密钥交换

IKE（Internet Key Exchange）

#### 密钥交换的类型

- 公钥加密
- DH（迪菲-赫尔曼
- ECDH（椭圆曲线 DH）
- ECDHE（临时椭圆曲线 DH）

## openSSL 的组成

- libencrypto 库
- libssl 库
- openssl 多用途命令行工具

## SSL 会话主要步骤

- 客户端向服务器端索要并验正证书
- 双方协商生成“会话密钥”
- 双方采用“会话密钥”进行加密通信

## PKI

公钥基础设施，Public Key Infrastructure。

### PKI 的组成

- 签证机构: CA
- 注册机构: RA
- 证书吊销列表: CRL
- 证书存取库

## 证书申请及签署步骤

1. 生成申请请求
2. RA 核验
3. CA 签署
4. 获取证书

## 建立私有 CA

配置文件: /etc/pki/tls/openssl.cnf

### 步骤

首先，需要构建私有 CA，在确定配置为 CA 的服务上生成一个自签证书，并为 CA 提供所需要的目录及文件即可。

其次，要用到证书进行安全通信的服务器，需要向 CA 请求签署证书。

#### 为 CA 提供所需的目录及文件

```bash
mkdir -pv /etc/pki/CA/{certs,crl,newcerts}
touch /etc/pki/CA/{serial,index.txt}
echo 01 > /etc/pki/CA/serial
```

#### 生成私钥

```bash
(umask 077;openssl genrsa -out /etc/pki/CA/private/cakey.pem 4096)
```

#### CA 生成自签证书

```bash
# -new: 生成新证书签署请求
# -x509: 生成自签格式证书，专用于创建私有CA
# -key: 生成请求时用到的私有文件路径
# -days: 证书的有效期限，单位是day
# -out: 生成的请求文件路径，如果自签操作将直接生成签署过的证书
openssl req -new -x509 -key /etc/pki/CA/private/cakey.pem -days 7300 -out /etc/pki/CA/cacert.pem
```

#### 发证

步骤: （以 httpd 为例）

1. 用到证书的主机生成私钥

   ```bash
   mkdir /etc/httpd/ssl
   cd /etc/httpd/ssl
   (umask 077;openssl genrsa -out /etc/httpd/ssl/httpd.key 2048)
   ```

2. 生成证书签署请求

   ```bash
   openssl req -new -key /etc/httpd/ssl/httpd.key -days 365 -out /etc/httpd/ssl/httpd.csr
   ```

3. 将请求通过可靠方式发送给 CA 主机

4. 在 CA 主机上签署证书

   ```bash
   openssl ca -in /tmp/httpd.csr -days 365 -out /etc/pki/CA/certs/httpd.crt
   ```

   查看证书中的信息

   ```bash
   openssl x509 -in /etc/pki/CA/certs/httpd.crt -noout -serial -subject -text
   ```

5. CA 签署证书后，将证书发还给请求者

#### 吊销证书

步骤:

1. 客户端获取要吊销的证书的 serial（在使用证书的主机执行）

   ```bash
   openssl x509 -in /etc/pki/CA/certs/httpd.crt -noout -serial -subject
   ```

2. CA 主机吊销证书

   先根据客户提交的 serial 和 subject 信息，对比其与本机数据库 index.txt 中存储的是否一致。

   吊销:

   ```bash
   openssl ca -revoke /etc/pki/CA/newcerts/SERIAL.pem
   ```

   其中的 SERIAL 要换成证书真正的序列号。

3. 生成吊销证书的吊销编号（第一次吊销证书时执行）

   ```bash
   echo 01 > /etc/pki/CA/crlnumber
   ```

4. 更新证书吊销列表

   ```bash
   openssl ca -gencrl -out thisca.crl
   ```

   查看 crl 文件:

   ```bash
   openssl crl -in /PATH/FROM/CRL_FILE.crl -noout -text
   ```

## openssl 命令

### enc

```bash
openssl enc -e -des3 -a -salt -in fstab -out fstab.ciphertext
openssl enc -d -des3 -a -salt -out fstab -in fstab.ciphertext
```

### dgst

```bash
openssl dgst -sha1 -out fstab.sha1 fstab
```

### passwd

```bash
openssl passwd -1 -salt roger.ink
```

### rand

```bash
openssl rand -base64 $num_of_char
openssl rand -hex $num_of_char
```

### genrsa

```bash
# 创建私钥
openssl genrsa -out rsakey.private 2048
```

### rsa

```bash
# 创建公钥
openssl rsa -in rsakey.private -pubout -out rsakey.pub
```
