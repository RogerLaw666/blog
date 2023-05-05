---
title: linux和macos系统更换源
date: 2020-11-22
category:
  - system
tag:
  - apt
  - yum
  - brew
  - bash
  - zsh
---

## 概述

在使用 linux 或者 macos 的过程中，如果通过系统自带的命令行工具去获取资源，在国内由于某些原因，获取的速度会很慢，这是需要换成国内的源，这样才能更好的安装和更新资源。

那么如何修改成国内的源呢，下面来细说一下。

## 修改 ubuntu 的 apt 源

首先备份 apt 的 sources.list。

```bash
sudo cp /etc/apt/sources.list{,.bak}
```

然后将 sources.list 替换为国内的阿里云地址。

```bash
sudo sed -i s/cn.archive.ubuntu/mirrors.aliyun/g /etc/apt/sources.list
sudo sed -i s/archive.ubuntu/mirrors.aliyun/g /etc/apt/sources.list
sudo sed -i s/security.ubuntu/mirrors.aliyun/g /etc/apt/sources.list
```

看一下 sources.list 中是否全部都是阿里云的地址了。

```bash
cat /etc/apt/sources.list|grep -vE '^#|^$'
```

确认没有问题后，最后更新源就可以了。

```bash
sudo apt update
```

## 修改 centos 的 yum 源

首先备份 yum 的 CentOS-Base.repo。

```bash
sudo cp /etc/yum.repos.d/CentOS-Base.repo{,.bak}
```

然后从阿里云下载最新的 Centos-8.repo 替换掉之前的 CentOS-Base.repo。

```bash
sudo curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
```

最后清理并缓存就可以了。

```bash
sudo yum clean all
sudo yum makecache
```

## 修改 macos 的 brew 源

首先替换 brew 在 github 的仓库地址为国内的阿里云地址。

```bash
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
```

然后替换 brew 在 github 的软件仓库地址为国内的阿里云地址。

```bash
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
```

之后再替换 brew 的 bottles 源。

对于 bash 用户：

```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bashrc
source ~/.bashrc
```

对于 zsh 用户：

```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
```

最后让 brew 更新源就可以了。

```bash
brew update
```

如果希望重置为官方的源，根据上面的操作步骤设置回去就可以了。

```bash
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```

对于 bash 用户：

```bash
sed -i '' 's/.*HOMEBREW_BOTTLE_DOMAIN.*//'g ~/.bashrc
source ~/.bashrc
```

对于 zsh 用户：

```bash
sed -i '' 's/.*HOMEBREW_BOTTLE_DOMAIN.*//'g ~/.zshrc
source ~/.zshrc
```
