---
title: Jetbrains 2021.2.2 重置 license
date: 2022-11-28
category:
  - tool
tag:
  - jetbrains
---

## 概述

Jetbrains 2021.2.2 重置 license，你懂的。

如果超过试用期就不能再继续试用了。

## 解决方案

将下面的脚本保存成文件执行，一次性重置该系列所有软件的试用时间。

```bash
#!/bin/bash

OS_NAME=$(uname -s)
JB_PRODUCTS="IntelliJIdea CLion PhpStorm GoLand PyCharm WebStorm Rider DataGrip RubyMine AppCode"

if [ $OS_NAME == "Darwin" ]; then
    echo 'macOS:'

    for PRD in $JB_PRODUCTS; do
        rm -rf ~/Library/Application\ Support/JetBrains/${PRD}*/eval
    done
elif [ $OS_NAME == "Linux" ]; then
    echo 'Linux:'

    for PRD in $JB_PRODUCTS; do
        rm -rf ~/.config/JetBrains/${PRD}*/eval
    done
elif [ $OS_NAME == "Windows" ]; then
    echo 'Windows:'

    for PRD in $JB_PRODUCTS; do
        rm -rf ~/AppData/Roaming/JetBrains/${PRD}*/eval
    done
else
    echo 'unsupport'
    exit
fi

echo 'done.'

```
