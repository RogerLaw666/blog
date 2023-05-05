---
title: unity的特殊路径
date: 2020-11-20
category:
  - tool
tag:
  - unity
---

## 概述

Unity中特殊文件夹，是比较容易混淆的，在此记录一下。

## StreamingAssetsPath

StreamingAssets 目录必须在 Assets 根目录下，该目录下所有资源会被打包到游戏里，该目录下的资源不会进行压缩，不加密，是只读不可写的。

### StreamingAssetsPath 的访问方式

Unity Editor, Windows, Linux players, PS4, Xbox One, Switch

- Application.dataPath + "/StreamingAssets"
- Application.streamingAssetsPath

macOS

- Application.dataPath + "/Resources/Data/StreamingAssets"

iOS

- Application.dataPath + "/Raw"

android

- "jar:file://" + Application.dataPath + "!/assets"

## PersistentDataPath

该目录为应用程序沙盒目录，应用程序安装后才会出现。该目录是可读可写的，所以我们一般将运行时下载的资源存放于此。

### PersistentDataPath 的访问方式

- Application.persistentDataPath

## DataPath

应用程序目录，即 Assets 目录。

### DataPath 的访问方式

- Appliction.dataPath

## Resources

Resources 文件夹可以在根目录下，也可以在子目录下，只要叫 Resources 就好。Resources 目录下所有资源将被压缩加密打包进游戏中，该目录下所有资源会被压缩，加密，只读不可写，在运行时 Resources 目录在应用中也就不复存在，但加载时仍使用曾在 Resource 下的路径。

### Resources 的访问方式

- Resources.Load()

## Editor

Editor 文件夹可以在根目录下，也可以在子目录下，只要叫 Editor 就好。

不会被打包，只能在unity的编辑器中使用。

## Plugin

Plugin 文件夹可以在根目录下，也可以在子目录下，只要叫 Plugin 就好。

会被打包，用来存放插件，jar包和第三方的SDK等。

## 各平台对应的地址

### IOS

Application.dataPath : Application/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/xxx.app/Data

Application.streamingAssetsPath : Application/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/xxx.app/Data/Raw

Application.persistentDataPath : Application/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/Documents

Application.temporaryCachePath : Application/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/Library/Caches

### Android

Application.dataPath : /data/app/xxx.xxx.xxx.apk

Application.streamingAssetsPath : jar:file:///data/app/xxx.xxx.xxx.apk/!/assets

Application.persistentDataPath : /data/data/xxx.xxx.xxx/files

Application.temporaryCachePath : /data/data/xxx.xxx.xxx/cache

### Windows

Application.dataPath : /Assets

Application.streamingAssetsPath : /Assets/StreamingAssets

Application.persistentDataPath : C:/Users/xxxx/AppData/LocalLow/CompanyName/ProductName

Application.temporaryCachePath : C:/Users/xxxx/AppData/Local/Temp/CompanyName/ProductName

### Mac

Application.dataPath : /Assets

Application.streamingAssetsPath : /Assets/StreamingAssets

Application.persistentDataPath : /Users/xxxx/Library/Caches/CompanyName/Product Name

Application.temporaryCachePath : /var/folders/57/6b4_9w8113x2fsmzx_yhrhvh0000gn/T/CompanyName/Product Name
