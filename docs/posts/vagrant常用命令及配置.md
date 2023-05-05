---
title: vagrant常用命令及配置
date: 2021-02-16
category:
  - tool
tag:
  - vagrant
  - virtualbox
---

## 概述

Vagrant 是一个基于 Ruby 的工具，用于创建和部署虚拟化开发环境。它使用 Oracle 的开源 VirtualBox 虚拟化系统，使用 Chef 创建自动化虚拟环境。

## 常用命令

- vagrant init
- vagrant up
- vagrant global-status
- vagrant status
- vagrant ssh
- vagrant validate
- vagrant reload
- vagrant provision
- vagrant suspend
- vagrant resume
- vagrant halt
- vagrant destroy

## 常用配置

```ruby
  config.vm.box = "roger-ubuntu"
  config.vm.hostname = "roger-ubuntu"
  config.vm.network "forwarded_port", guest: 80, host: 80, auto_correct: true
  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", "4096"]
    vb.customize ["modifyvm", :id, "--cpus", "4"]
  end
  config.vm.network "private_network", ip: "192.168.1.100"
  config.vm.synced_folder ".", "/vagrant", enabled: false
  config.vm.synced_folder ".", "/home/vagrant/share"
  config.vm.provision "shell", path: "./provision/install.sh"
```
