---
title: git submodule的基本使用
date: 2021-08-13
category:
  - tool
tag:
  - git
  - submodule
---

## 概述

记录下 git submodule 的使用。

## 初始化

```bash
git submodule init
```

## 添加

```bash
git submodule add $repo_path $submodule_name
```

## 更新

```bash
git pull --recurse-submodules
```

## 删除

```bash
git submodule deinit $submodule_path
git rm --cached $submodule_path
```
