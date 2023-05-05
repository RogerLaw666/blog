---
title: linux和macos系统必备命令行工具
date: 2020-11-22
category:
  - commandline
tag:
  - zsh
  - vim
  - proxy
---

## 概述

下面记录一下我在日常中使用到的一些命令行工具，对应的平台是 linux 和 macos。不能说这些是最好的，但是对于我来说，这些是适合我的。

## 安装必要的软件

首先将系统更新到最新，接下来安装必要的软件。

对于 ubuntu 用户：

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git zsh curl tmux openssh-server net-tools xclip
```

对于 centos 用户：

```bash
sudo yum update -y
sudo yum install git zsh wget tmux net-tools xclip
```

对于 macos 用户：

```bash
brew update
brew cask install google-chrome qq slack wechat iterm2
brew install fd node fzf python reattach-to-user-namespace git-flow-avh ripgrep ruby go tmux lua unrar httpie wget neovim
brew tap homebrew/cask-fonts
brew cask install baidunetdisk dash docker mpv elmedia-player postman font-fira-code visual-studio-code dotnet-sdk
brew cask install qlmarkdown qlstephen qlvideo quicklook-json quicklookase qlcolorcode qlimagesize betterzip suspicious-package provisionql quicklookapk quicklook-pat
```

## 安装 oh-my-zsh

shell 的类型有很多种，linux 下默认的是 bash，虽然 bash 的功能已经很强大，但对于以懒惰为美德的程序员来说，bash 的提示功能不够强大，界面也不够炫，并非理想工具。

而 zsh 的功能极其强大，只是配置过于复杂，起初只有极客才在用。后来，有个穷极无聊的程序员可能是实在看不下去广大猿友一直只能使用单调的 bash, 于是他创建了一个名为 oh-my-zsh 的开源项目...

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

安装完成后，再安装 3 个很有用的插件。

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting && git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions
```

然后在~/.zshrc中，设置自动提示的颜色。

```bash
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=10'
```

接下来设置~/.zshrc。

```bash
plugins=(branch colored-man-pages common-aliases copybuffer copydir copyfile cp dash docker docker-compose docker-machine encode64 extract fancy-ctrl-z fd frontend-search gem git git-flow-avh gitignore history history-substring-search helm httpie jsontools kubectl kube-ps1 minikube nmap npm nvm perms pip ripgrep rsync systemadmin transfer urltools web-search zsh_reload zsh-autosuggestions zsh-completions zsh-syntax-highlighting)
```

## 安装 neovim

Bram Moolenaar 在写 Vim 时还是 90 年代初，至今已经 20 多年 过去了。

其中，不仅包含了大量的遗留代码，而且程序的维护、Bug 的 修复、以及新特性的添加都变得越来越困难。

为了解决这些问题，Neovim 项目应运而生。Neo 即“新”之意，它是 Vim 在这个新时代的重生。

对于 ubuntu 用户：

```bash
sudo add-apt-repository ppa:neovim-ppa/stable
sudo apt update
sudo apt install -y neovim
```

对于 centos 用户：

```bash
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo yum install -y neovim python3-neovim
```

对于 macos 用户：

```bash
brew install neovim
```

接下来需要安装 vim-plug。

```bash
curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

然后将之前的.vimrc 设置文件链接到 nvim 下的 init.vim。

```bash
ln -s ~/.vimrc ~/.config/nvim/init.vim
```

进入 nvim，然后执行 PlugInstall 安装 vim 插件。

```bash
PlugInstall
```

在 nvim 中安装完插件后，再检查一下健康状况。

```bash
checkhealth
```

如果提示没有 ruby，python 和 node 的支持，需要额外安装 ruby，python 和 node，并在其中安装 neovim 的插件。

安装 ruby：

```bash
sudo apt install -y ruby ruby-dev
sudo gem install neovim
```

安装 python3：

```bash
sudo apt install -y python3 python3-pip
pip3 install --upgrade pip
pip3 install pynvim
```

安装 node：

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install -y nodejs
npm config set registry https://registry.npm.taobao.org
sudo npm install -g neovim
```

## 安装 v2ray

V2Ray 是一个优秀的开源网络代理工具，可以帮助你畅爽体验互联网，目前已经全平台支持 Windows、Mac、Android、IOS、Linux 等操作系统的使用。相对起 Shadowsocks 来说属于后起之秀，在混淆能力、兼容性、速度上有着独到的优点。

首先下载 v2ray 的安装脚本。

```bash
curl -O https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh
chmod u+x install-release.sh
```

然后下载 v2ray 的对应的平台版本到本地。

```bash
curl -O https://github.com/v2fly/v2ray-core/releases/download/v4.33.0/v2ray-linux-64.zip
sudo ./install-release.sh -l v2ray-linux-64.zip
sudo systemctl enable v2ray
sudo systemctl start v2ray
```

接下来修改配置文件，替换成自己的服务器 ip，端口，密码和加密方式。

```bash
sudo vi /usr/local/etc/v2ray/config.json
```

```conf
{
  "inbounds": [
    {
      "port": 1080, // 监听端口
      "protocol": "socks", // 入口协议为 SOCKS 5
      "sniffing": {
        "enabled": true,
        "destOverride": ["http", "tls"]
      },
      "settings": {
        "auth": "noauth"  // 不认证
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "shadowsocks",
      "settings": {
        "servers": [
          {
            "address": "serveraddr.com", // Shadowsocks 的服务器地址
            "method": "aes-128-gcm", // Shadowsocks 的加密方式
            "ota": true, // 是否开启 OTA，true 为开启
            "password": "sspasswd", // Shadowsocks 的密码
            "port": 1024
          }
        ]
      }
    }
  ]
}
```

设置完成后，重启v2ray服务。

```bash
sudo systemctl restart v2ray
```

## 安装 proxychains

因为某些原因，我们需要在命令行下载一些国外的资源，这个时候如果使用 wget，curl，或者 aria2c 的时候，往往又没有速度。这个时候我们需要使用代理来进行加速。

对于 ubuntu 用户：

```bash
sudo apt install -y proxychains
```

对于 centos 用户：

```bash
git clone https://github.com/rofl0r/proxychains-ng.git
cd proxychains-ng
./configure
make && sudo make install
sudo cp src/proxychains.conf /etc/proxychains.conf
```

对于 macos 用户：

```bash
brew install proxychains-ng
```

安装完成后，编辑/etc/proxychains.conf 配置文件。

```bash
sudo vi /etc/proxychains.conf
socks5 127.0.0.1 1080
```

然后在命令行中使用 proxychains curl <https://www.youtube.com> 就可以了。

为了简单，可以在.bashrc 中设置 alias pc="proxychains"。

如果在使用中发现报错，ERROR: ld.so: object libproxychains.so.3 from LD_PRELOAD cannot be preloaded (cannot open shared object file): ignored，需要修改一下/usr/bin/proxychains。

```bash
sudo find /usr/ -name libproxychains.so.3
sudo vi /usr/bin/proxychains
export LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libproxychains.so.3
```
