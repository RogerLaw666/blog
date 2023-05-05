---
title: openssh的基本应用
date: 2020-11-05
category:
  - commandline
tag:
  - openssl
  - openssh
---

## 概述

OpenSSH 是 SSH （Secure SHell） 协议的免费开源实现。SSH 协议族可以用来进行远程控制， 或在计算机之间传送文件。而实现此功能的传统方式，如 telnet(终端仿真协议)、 rcp ftp、 rlogin、rsh 都是极为不安全的，并且会使用明文传送密码。OpenSSH 提供了服务端后台程序和客户端工具，用来加密远程控制和文件传输过程中的数据，并由此来代替原来的类似服务。

OpenSSH 是使用 SSH 透过计算机网络加密通讯的实现。它是取代由 SSH Communications Security 所提供的商用版本的开放源代码方案。目前 OpenSSH 是 OpenBSD 的子计划。

OpenSSH 常常被误认以为与 OpenSSL 有关联，但实际上这两个计划的有不同的目的，不同的发展团队，名称相近只是因为两者有同样的软件发展目标 ── 提供开放源代码的加密通讯软件。

<!--more -->

## sshd_config 的说明

| 字段                            | 默认值                                     | 说明                                                                                                                                                                                                                                                                                                                     |
| ------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Protocol                        | 2                                          | 新版本在默认情况下，使用的是 protocol 2。如果旧版本默认情况下使用的是 protocol 1，需要在配置文件中加入 Protocol 2。                                                                                                                                                                                                      |
| Port                            | 22                                         | 监听的端口号。                                                                                                                                                                                                                                                                                                           |
| AddressFamily                   | any                                        | 地址族 "any"(默认)、"inet"(仅 IPv4)、"inet6"(仅 IPv6)。                                                                                                                                                                                                                                                                  |
| ListenAddress                   | 0.0.0.0                                    | IPv4 监听所有地址。                                                                                                                                                                                                                                                                                                      |
| ListenAddress                   | ::                                         | IPv6 监听所有地址。                                                                                                                                                                                                                                                                                                      |
| HostKey                         | /etc/ssh/ssh_host_rsa_key                  | 主机私钥文件的位置。                                                                                                                                                                                                                                                                                                     |
| HostKey                         | /etc/ssh/ssh_host_ecdsa_key                | 主机私钥文件的位置。                                                                                                                                                                                                                                                                                                     |
| HostKey                         | /etc/ssh/ssh_host_ed25519_key              | 主机私钥文件的位置。                                                                                                                                                                                                                                                                                                     |
| RekeyLimit                      | default none                               |
| SyslogFacility                  | AUTH                                       | 日志消息通过哪个日志子系统(facility)发送，有效值有 DAEMON, USER, AUTH(默认), LOCAL0, LOCAL1, LOCAL2, LOCAL3, LOCAL4, LOCAL5, LOCAL6, LOCAL7。在 centos 中，记录在/var/log/secure，在 ubuntu 中，记录在/var/log/auth.log。                                                                                                |
| LogLevel                        | INFO                                       | 日志等级，有效值有 QUIET, FATAL, ERROR, INFO(默认), VERBOSE, DEBUG, DEBUG1, DEBUG2, DEBUG3。                                                                                                                                                                                                                             |
| LoginGraceTime                  | 2m                                         | 限制用户必须在指定的时限内认证成功，0 表示无限制。默认值是 120 秒。                                                                                                                                                                                                                                                      |
| PermitRootLogin                 | prohibit-password                          | 是否允许 root 登录。可用值如下:"yes"(默认) 表示允许。"no"表示禁止。"prohibit-password"表示允许 root 登陆，但禁止其使用密码认证登录。                                                                                                                                                                                     |
| StrictModes                     | yes                                        | 严格检查模式，在接受连接请求前对用户主目录和相关的配置文件进行宿主和权限检查。                                                                                                                                                                                                                                           |
| MaxAuthTries                    | 6                                          | 每个连接最大允许的认证次数，比如输入密码错误次数。                                                                                                                                                                                                                                                                       |
| MaxSessions                     | 10                                         | 每个连接可以并行开启多少个会话。                                                                                                                                                                                                                                                                                         |
| PubkeyAuthentication            | yes                                        | 是否允许公钥认证。                                                                                                                                                                                                                                                                                                       |
| AuthorizedKeysFile              | .ssh/authorized_keys .ssh/authorized_keys2 | 存放该用户可以用来登录的公钥位置。                                                                                                                                                                                                                                                                                       |
| AuthorizedPrincipalsFile        | none                                       |
| AuthorizedKeysCommand           | none                                       |
| AuthorizedKeysCommandUser       | nobody                                     |
| HostbasedAuthentication         | no                                         |
| IgnoreUserKnownHosts            | no                                         |
| IgnoreRhosts                    | yes                                        |
| PasswordAuthentication          | yes                                        | 是否允许使用基于密码的认证。默认为"yes"。                                                                                                                                                                                                                                                                                |
| PermitEmptyPasswords            | no                                         | 是否允许密码为空的用户远程登录。默认为"no"。                                                                                                                                                                                                                                                                             |
| ChallengeResponseAuthentication | no                                         | 是否允许质疑-应答(challenge-response)认证。默认值是"yes"。一般关闭，不安全。                                                                                                                                                                                                                                             |
| KerberosAuthentication          | no                                         | 是否要求用户为 PasswordAuthentication 提供的密码必须通过 Kerberos KDC 认证，也就是是否使用 Kerberos 认证。大规模统一认证的时候使用。                                                                                                                                                                                     |
| KerberosOrLocalPasswd           | yes                                        |
| KerberosTicketCleanup           | yes                                        |
| KerberosGetAFSToken             | no                                         |
| GSSAPIAuthentication            | no                                         | 是否允许使用基于 GSSAPI 的用户认证。默认值为"no"。                                                                                                                                                                                                                                                                       |
| GSSAPICleanupCredentials        | yes                                        |
| GSSAPIStrictAcceptorCheck       | yes                                        |
| GSSAPIKeyExchange               | no                                         |
| UsePAM                          | yes                                        | 是否启用 PAM 认证。                                                                                                                                                                                                                                                                                                      |
| AllowAgentForwarding            | yes                                        |
| AllowTcpForwarding              | yes                                        | 是否允许 TCP 转发，默认值为"yes"。                                                                                                                                                                                                                                                                                       |
| GatewayPorts                    | no                                         | 是否允许远程主机连接本地的转发端口。默认值是"no"。                                                                                                                                                                                                                                                                       |
| X11Forwarding                   | yes                                        | 是否允许进行 X11 转发。默认值是"no"，设为"yes"表示允许。需要在客户端连接时加入-X 选项。                                                                                                                                                                                                                                  |
| X11DisplayOffset                | 10                                         |
| X11UseLocalhost                 | yes                                        |
| PermitTTY                       | yes                                        |
| PrintMotd                       | no                                         | 是否在每一次交互式登录时打印/etc/motd 文件的内容。默认值是"yes"。                                                                                                                                                                                                                                                        |
| PrintLastLog                    | yes                                        | 是否在每一次交互式登录时打印最后一位用户的登录时间。默认值是"yes"。                                                                                                                                                                                                                                                      |
| TCPKeepAlive                    | yes                                        | 系统是否向客户端发送 TCP keepalive 消息。默认值是"yes"。                                                                                                                                                                                                                                                                 |
| PermitUserEnvironment           | no                                         | 是否允许处理~/.ssh/environment 以及~/.ssh/authorized_keys 中的 environment=选项。默认值是"no"。如果设为"yes"可能会导致用户有机会使用某些机制(比如 LD_PRELOAD)绕过访问控制，造成安全漏洞。                                                                                                                                |
| Compression                     | delayed                                    | 是否对通信数据进行加密，还是延迟到认证成功之后再对通信数据加密。可用值:"yes", "delayed"(默认), "no"。                                                                                                                                                                                                                    |
| ClientAliveInterval             | 0                                          | 设置一个以秒记的时长，如果超过这么长时间没有收到客户端的任何数据，将通过安全通道向客户端发送一个"alive"消息，并等候应答。默认值为 0，表示不发送"alive"消息。                                                                                                                                                             |
| ClientAliveCountMax             | 3                                          | 在未收到任何客户端回应前最多允许发送多少个"alive"消息。默认值是 3。到达这个上限后，将强制断开连接、关闭会话。                                                                                                                                                                                                            |
| UseDNS                          | no                                         | 是否应该对远程主机名进行反向解析，以检查此主机名是否与其 IP 地址真实对应。默认值为"yes"。                                                                                                                                                                                                                                |
| PidFile                         | /var/run/sshd.pid                          | 在哪个文件中存放 SSH 守护进程的进程号，默认为/var/run/sshd.pid 文件。                                                                                                                                                                                                                                                    |
| MaxStartups                     | 10:30:100                                  | 10:当连接数达到 10 时就开始拒绝连接，不过不是全部拒绝。30:当连接数到达 10 时，之后的连接有 30 的概率被拒绝掉。100:当连接数达到 100 时，之后的连接就全部拒绝了。可以直接设置为 10，达到 10 后就不能连接了。                                                                                                               |
| PermitTunnel                    | no                                         | 是否允许 tun(4)设备转发。可用值为:"yes", "point-to-point"(layer 3), "ethernet"(layer 2), "no"(默认)。"yes"同时蕴含着"point-to-point"和"ethernet"。                                                                                                                                                                       |
| ChrootDirectory                 | none                                       |
| VersionAddendum                 | none                                       |
| Banner                          | none                                       | 将指定的文件中的内容在用户进行认证前显示给远程用户。                                                                                                                                                                                                                                                                     |
| AcceptEnv                       | LANG LC\_\*                                | 指定客户端发送的哪些环境变量将会被传递到会话环境中。                                                                                                                                                                                                                                                                     |
| Subsystem                       | sftp /usr/lib/openssh/sftp-server          | 配置一个外部子系统(例如，一个文件传输守护进程)。值是一个子系统的名字和对应的命令行(含选项和参数)。比如"sftp /usr/lib/openssh/sftp-server"。                                                                                                                                                                              |
| AllowUsers                      |                                            | 这个指令后面跟着一串用空格分隔的用户名列表(其中可以使用"\*"和"?"通配符)。默认允许所有用户登录。如果使用了这个指令，那么将仅允许这些用户登录，而拒绝其它所有用户。如果指定了 USER@HOST 模式的用户，那么 USER 和 HOST 将同时被检查。例如:AllowUsers admin@192.168.0.1。指定多用户用空格:AllowUsers admin@192.168.0.1 user1 |
| AllowGroups                     |                                            | 这个指令后面跟着一串用空格分隔的组名列表(其中可以使用"\*"和"?"通配符)。默认允许所有组登录。如果使用了这个指令，那么将仅允许这些组中的成员登录，而拒绝其它所有组。这里的"组"是指"主组"(primary group)，也就是/etc/passwd 文件中指定的组。                                                                                 |
| DenyUsers                       |                                            | 这个指令后面跟着一串用空格分隔的用户名列表(其中可以使用"\*"和"?"通配符)。默认允许所有用户登录。如果使用了这个指令，那么这些用户将被拒绝登录。如果指定了 USER@HOST 模式的用户，那么 USER 和 HOST 将同时被检查。                                                                                                           |
| DenyGroups                      |                                            | 这个指令后面跟着一串用空格分隔的组名列表(其中可以使用"\*"和"?"通配符)。默认允许所有组登录。如果使用了这个指令，那么这些组中的成员将被拒绝登录。这里的"组"是指"主组"(primary group)，也就是/etc/passwd 文件中指定的组。                                                                                                   |
| Match                           | User anoncvs                               | 引入一个条件块。块的结尾标志是另一个 Match 指令或者文件结尾。如果 Match 行上指定的条件都满足，那么随后的指令将覆盖全局配置中的指令。Match 的值是一个或多个"条件-模式"对。可用的"条件"是:User,Group,Host,Address。                                                                                                        |

## ssh 服务的最佳实践

- 不要使用默认端口
- 禁止使用 protocol version 1
- 限制可登录的用户
- 设定空闲会话超时时长
- 利用防火墙设置 ssh 访问策略
- 仅监听特定的 IP 地址
- 基于口令认证时，使用强密码策略

    ```bash
    tr -dc A-Za-z0-9\_ < /dev/urandom | head -c 30 | xargs
    ```

- 使用基于密钥的认证
- 禁止使用空密码
- 禁止 root 用户直接登录
- 限制 ssh 的访问频度和并发在线数

## ssh

```bash
# -p port: 远程服务器监听的端口
# -X: 支持x11转发
# -Y: 支持信任的x11转发
ssh $username@$host
```

## ssh-keygen

```bash
ssh-keygen -t rsa
```

## ssh-copy-id

```bash
ssh-copy-id $username@$host
```

## test

```bash
ssh -T git@github.com
```

## scp

```bash
# -r: 递归复制
# -p: 保持源文件的属性信息
# -q: 静默模式
# -P: host监听的端口
scp $username@$host:$path_to_file $path_to_file
scp $path_to_file $username@$host:$path_to_file
```
