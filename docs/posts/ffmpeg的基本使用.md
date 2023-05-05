---
title: ffmpeg的基本使用
date: 2022-06-09
category:
  - commandline
tag:
  - ffmpeg
---

## 概述

ffmpeg 是一个开放源代码的自由软件，可以执行音频和视频多种格式的录影、转换、串流功能。

ffmpeg 由几个组件组成：

- 命令行应用程序

  - ffmpeg：用于对视频文档或音频档案转换格式
  - ffplay：一个简单的播放器，基于 SDL 与 FFmpeg 库
  - ffprobe：用于显示媒体文件的信息，见 MediaInfo

- 函数库
  - libswresample
  - libavresample
  - libavcodec：包含全部 FFmpeg 音频/视频编解码库
  - libavformat：包含 demuxers 和 muxer 库
  - libavutil：包含一些工具库
  - libpostproc：对于视频做前处理的库
  - libswscale：对于影像作缩放的库
  - libavfilter

## 用法

ffmpeg [global_options] {[input_file_options] -i input_url} ... {[output_file_options] output_url} ...

## 命令

### 查看帮助信息

```bash
ffmpeg -h # 一般
ffmpeg -h long # 详细
ffmpeg -h full # 非常详细
```

### 查看具体分类所支持的参数

```bash
# ffmpeg -h type=name

ffmpeg -h muxer=flv
ffmpeg -h filter=atempo
ffmpeg -h encoder=libx264
```

### 查看版本

```bash
ffmpeg -version
```

### 查看编译配置

```bash
ffmpeg -buildconf
```

### 隐藏 banner

```bash
ffmpeg -hide_banner
```

### 显示可用格式(muxers+demuxers)

```bash
ffmpeg -formats
```

### 显示可用复用器

```bash
ffmpeg -muxers
```

### 显示可用解复用器

```bash
ffmpeg -demuxers
```

### 显示可用编解码器(decoders+encoders)

```bash
ffmpeg -codecs
```

### 显示可用编码器

```bash
ffmpeg -encoders
```

### 显示可用解码器

```bash
ffmpeg -decoders
```

### 显示可用的比特流 filter

```bash
ffmpeg -bsfs
```

### 显示可用的协议

```bash
ffmpeg -protocols
```

### 显示可用的过滤器

```bash
ffmpeg -filters
```

### 显示可用的像素格式

```bash
ffmpeg -pixfmts
```

### 显示标准声道名称

```bash
ffmpeg -layouts
```

### 显示可用的音频采样格式

```bash
ffmpeg -sample_fmts
```

### 显示可用的颜色名称

```bash
ffmpeg -colors
```

## 参数

### 主要参数

- -i: 设置输入文件名。
- -f: 设置输出格式。
- -y: 若输出文件已存在时则覆盖文件。
- -fs: 超过指定的文件大小时则结束转换。
- -t: 指定输出文件的持续时间，以秒为单位。
- -ss: 从指定时间开始转换，以秒为单位。
- -ss 和-t: 使用时代表从-ss 的时间开始转换持续时间为-t 的视频，例如：-ss 00:00:01.00 -t 00:00:10.00 即从 00:00:01.00 开始转换到 00:00:11.00。
- -title: 设置标题。
- -timestamp: 设置时间戳。
- -vsync: 增减 Frame 使影音同步。
- -c: 指定输出文件的编码。
- -metadata: 更改输出文件的元数据。
- -help: 查看帮助信息。

### 影像参数

- -b\:v 或 -vb: 设置影像流量，默认为 200Kbit/秒。（单位请引用下方注意事项）
- -r: 设置帧率值，默认为 25。
- -s: 设置画面的宽与高。
- -aspect: 设置画面的比例。
- -vn: 不处理影像，于仅针对声音做处理时使用。
- -vcodec( -c:v ): 设置影像编解码器，未设置时则使用与输入文件相同之编解码器。

### 声音参数

- -b\:a 或 -ab: 设置每 Channel（最近的 SVN 版为所有 Channel 的总合）的流量。（单位请引用下方注意事项）
- -ar: 设置采样率。
- -ac: 设置声音的 Channel 数。
- -acodec ( -c:a ): 设置声音编解码器，未设置时与影像相同，使用与输入文件相同之编解码器。
- -an: 不处理声音，于仅针对影像做处理时使用。
- -vol: 设置音量大小，256 为标准音量。（要设置成两倍音量时则输入 512，依此类推。）

### 注意事项

- 以-b:v 及-b:a 参数设置流量时，根据使用的 ffmpeg 版本，须注意单位会有 kbits/sec 与 bits/sec 的不同。（可用 ffmpeg -h 显示说明来确认单位。）

  例如，单位为 bits/sec 的情况时，欲指定流量 64kbps 时需输入 -b:a 64k；单位为 kbits/sec 的情况时则需输入 -b:a 64。

- 以-acodec 及-vcodec 所指定的编解码器名称，会根据使用的 ffmpeg 版本而有所不同。例如使用 AAC 编解码器时，会有输入 aac 与 libfaac 的情况。此外，编解码器有分为仅供解码时使用与仅供编码时使用，因此一定要利用 ffmpeg -formats 确认输入的编解码器是否能运作。
