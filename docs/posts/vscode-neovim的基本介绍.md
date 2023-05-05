---
title: vscode-neovim的基本介绍
date: 2022-08-31
category:
  - tool
tag:
  - vscode
  - neovim
---

## 概述

vscode 是微软开发的一款跨平台文本编辑器，基于 Electron 框架构建。

neovim 是 vim 的一个分支，允许更大的可扩展性和集成性。旨在改进代码库，从而使得 API 更容易实现，并改善用户体验和插件实现。

之前在 vscode 中使用 vscode-vim 插件来进行开发是模拟 vim 的行为。而现在使用完全嵌入的 neovim 实例，不再需要半完整的 vim 模拟器了！vscode 的原生功能用于插入模式和编辑器命令，可以充分利用这两种编辑器。

1. 通过使用 neovim 作为后端，几乎完全功能完整的 vim 集成。

2. 支持自定义 init.vim 和许多 vim 插件。

3. 一流且无延迟的插入模式，让 vscode 尽其所能。

4. 与 vscode 功能完全集成（lsp/autocompletion/snippets/multi-cursor/etc）。

## 原理

以下是关于 vscode-nvim 如何工作的，摘自官方文档：

- vscode 连接到 neovim 实例。

- 打开某个文件时，会在 nvim 中创建一个暂存缓冲区，并使用来自 vscode 的文本内容进行初始化。

- NORMAL / VISUAL 模式命令直接发送到 neovim。该扩展程序侦听缓冲区事件并应用来自 neovim 的编辑。

- 当进入插入模式时，扩展停止监听击键事件并将打字模式委托给 vscode（这里没有和 neovim 通信）。

- 从插入模式按下退出键后，扩展程序将从插入模式获得的更改发送到 neovim。

## 安装

- [vscode](https://code.visualstudio.com/)

- [neovim]([Release Nvim v0.7.2 · neovim/neovim · GitHub](https://github.com/neovim/neovim/releases/tag/v0.7.2))

- [vscode-neovim](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim)

## 配置

### 启动配置

$HOME/.config/nvim 下有个 init.vim 或 init.lua 的文件，是 nvim 的配置文件，如果不存在，那么请创建它。neovim 同时支持 VIM 语法和 Lua 语法配置。

```vim
if exists('g:vscode')
    " 加载 vscode 插件或配置
    set nobackup
else
    " 加载 neovim 插件或配置
    set mouse=a
endif

" 始终都会加载的配置项
let mapleader = "\<space>"
```

另外对于一些插件来说，你也可以单独的指定它们的启动模式，如禁用原生的 vim-easymotion，而启用 vscode-nvim 作者改版的 vim-easymotion。

```vim
" inside plug#begin:
" use normal easymotion when in vim mode
Plug 'easymotion/vim-easymotion', Cond(!exists('g:vscode'))

" use vscode easymotion when in vscode mode
Plug 'asvetliakov/vim-easymotion', Cond(exists('g:vscode'), { 'as': 'vsc-easymotion' })
```

### 调用 vscode 命令

```vim
" 使用可选参数调用vscode命令
VSCodeNotify(command, ...)

" 将line1到line2的可视模式选择变更为vscode的选择，并且会调用vscode命令，如果将leaveSelection设置成1，会在调用命令后删除vscode选择
VSCodeNotifyRange(command, line1, line2, leaveSelection ,...)

" 将line1.pos1到line2.pos2的可视模式选择变更为vscode的选择，并且会调用vscode命令，如果将leaveSelection设置成1，会在调用命令后删除vscode选择
VSCodeNotifyRangePos(command, line1, line2, pos1, pos2, leaveSelection ,...)

" 将可视模式下的选择变更为vscode的选择，并且会调用vscode命令，如果将leaveSelection设置成1，会在调用命令后删除vscode选择
VSCodeNotifyVisual(command, leaveSelection, ...)
```

## 参考

> [vscode-neovim](https://github.com/vscode-neovim/vscode-neovim)

> [vscode-nvim - 云崖君 - 博客园](https://www.cnblogs.com/YunyaSir/p/15523927.html)
