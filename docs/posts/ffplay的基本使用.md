---
title: ffplay的基本使用
date: 2022-06-09
category:
  - commandline
tag:
  - ffplay
  - ffmpeg
---

## 概述

ffplay 是一个基于 FFMPEG 库和 SDL 库开发的多媒体播放器。它的主要目的是是用来测试 FFMPEG 的各种 API，比如 codec/format/filter 等等库。

掌握 ffplay 的设计逻辑，对于播放器开发人员提升经验非常有帮助。哔哩哔哩的 ijkplayer 就是基于 ffplay 做的二次开发。

## 用法

ffplay [options] [input_url]

## 播放控制快捷键

| 选项       | 说明                                   |
| ---------- | -------------------------------------- |
| q,ESC      | 退出播放                               |
| f          | 全屏切换                               |
| p, SPACE   | 暂停                                   |
| 9,0        | 9 减少音量，0 增加音量                 |
| a          | 循环切换音频流                         |
| v          | 循环切换视频流                         |
| t          | 循环切换字幕流                         |
| c          | 循环切换节目                           |
| w          | 循环切换过滤器或显示模式               |
| s          | 逐帧播放                               |
| left,right | 向后，向前拖动 10 秒                   |
| down,up    | 向后，向前拖动 1 分钟                  |
| 右键单击   | 拖动与显示宽度对应百分比的文件进行播放 |
| 左键双击   | 全屏切换                               |

## 命令

### 查看帮助信息

```bash
ffplay -h
```

### 查看版本

```bash
ffplay -version
```

### 查看编译配置

```bash
ffplay -buildconf
```

### 隐藏 banner

```bash
ffmpeg -hide_banner
```

### 强制显示宽度

```bash
ffplay -x width
```

### 强制显示高度

```bash
ffplay -y height
```

### 全盘模式启动

```bash
ffplay -fs
```

### 禁用音频

```bash
ffplay -an
```

### 禁用视频

```bash
ffplay -vn
```

### 禁用字幕

```bash
ffplay -sn
```

### 开始播放位置

```bash
ffplay -ss $pos
```

### 播放时长

```bash
ffplay -t $duration
```

### 不显示播放窗口

```bash
ffplay -nodisp
```

### 不显示播放窗口边框

```bash
ffplay -noborder
```

### 设置起始音量

```bash
# 音量范围0-100
ffplay -volume $vol
```

### 强制使用设置的格式进行解析

```bash
ffplay -f $fmt
```

### 设置播放窗口的标题

```bash
ffplay -window_title $title
```

### 设置播放次数

```bash
ffplay -loop $num
```

### 设置显示模式

```bash
# 0: 显示视频
# 1: 显示音频波形
# 2: 显示音频频谱。
# 默认为0，如果视频不存在则自动选择2。
ffplay -showmode $mode
```

### 设置视频滤镜

```bash
ffplay -vf $filtergraph
ffplay -i test.mp4 -vf transpose=1
# 视频旋转
ffplay -vf transpose=1 test.mp4
# 视频水平翻转
ffplay -vf hflip test.mp4
# 视频垂直翻转
ffplay -vf vflip test.mp4
# 视频旋转和垂直翻转
ffplay -vf vflip, transpose=1 test.mp4
# 音频变速播放
ffplay -i test.mp4 -af atempo=2
# 视频变速播放
ffplay -i test.mp4 -vf setpts=PTS/2
# 音视频同时变速播放
ffplay -i test.mp4 -vf setpts=PTS/2 -af atempo=2
```

### 设置音频滤镜

```bash
ffplay -af $filtergraph
```

### 是否打印统计信息

```bash
# 默认启用
ffplay -stats
# 禁用
ffplay -nostats
```

### 非标准化规范的多媒体兼容优化

```bash
ffplay -fast
```

### 生成 pts

```bash
ffplay -genpts
```

### 设置同步类型

```bash
# type: audio(默认)，video，ext
ffplay -sync $type
```

### 设置音频索引流

```bash
ffplay -ast $audio_stream_specifier
```

### 设置视频索引流

```bash
ffplay -vst $video_stream_specifier
```

### 设置字幕索引流

```bash
ffplay -sst $subtitle_stream_specifier
```

### 播放完毕自动退出

```bash
ffplay -autoexit
```

### 按下任意键退出播放

```bash
ffplay -exitonkeydown
```

### 按下鼠标任意键退出播放

```bash
ffplay -exitonmousedown
```

### 强制使用设置的解码器

```bash
# media_specifier: a(音频)，v(视频)，s(字幕)
ffplay -codec: $meida_specifier $codec_name
ffplay -codec:v h264_qsv

ffplay -acodec $codec_name
ffplay -vcodec $codec_name
ffplay -scodec $codec_name
```

### 根据文件元数据自动旋转视频

```bash
ffplay -autorotate
```

### 视频不同步则丢弃视频帧

```bash
ffplay -framedrop
```

### 不限制缓冲区大小

```bash
ffplay -infbuf
```
