---
title: 在老旧mac上安装最新版本的macOS
date: 2022-06-02
category:
  - system
tag:
  - macos
---

请访问原文链接：[在不受支持的 Mac 上安装 macOS Monterey 12（OpenCore-Patcher）](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/ "在不受支持的 Mac 上安装 macOS Monterey 12（OpenCore-Patcher）")，查看最新版。

## 1. 安装准备

1. 下载最新的  [Opencore-Legacy-Patcher](https://github.com/dortania/Opencore-Legacy-Patcher/)

   发布的有 4 个版本：

   - OpenCore-Patcher-GUI-Offline.app：图形界面 App，包含了程序运行所需的全部文件，推荐！！！
   - OpenCore-Patcher-GUI.app：图形界面 App。
   - OpenCore-Patcher-TUI-Offline.app：Terminal 命令行界面，包含离线文件。
   - OpenCore-Patcher-TUI：Terminal 命令行界面。

   备用：百度网盘链接：[百度网盘 请输入提取码](https://pan.baidu.com/s/1F8mQT9AfQO37IMKl364eMA)  提取码：kb8n

   下载后请将 OpenCore-Patcher.app 拖拽到 Applications 目录下。

   > 版本更新：0.4.3 支持 macOS 12.3。

2. 下载  [macOS Monterey](https://sysin.org/blog/macOS-Monterey/)

   下载后打开镜像，将 “安装 macOS Monterey” App 拖拽到（或者自动安装到）Applications（应用程序）下。

   同样支持  [macOS Big Sur](https://sysin.org/blog/macOS-Big-Sur/)。

3. USB 存储设备 16G 及以上

   可以是 U 盘，甚至是 SD 卡，当然最好是 SSD 的移动硬盘，容量 16G 及以上。

## 2. 构建和安装

1. 创建启动介质

   准备一个 16G 或者以上的 U 盘（或者其他 USB 存储设备，以下统称 U 盘），打开 “实用工具> 磁盘工具”，选择 U 盘，点击 “抹掉”，格式如下：

   - Mac OS X 扩展（日志式）；
   - GUID 分区图；
   - 分区名称：sysin

   打开 “终端”，执行如下命令：

   ```bash
   sudo /Applications/Install\ macOS\ Monterey.app/Contents/Resources/createinstallmedia --volume /Volumes/sysin
   ```

   根据提示输入当前用户密码（sudo 密码），按 Y 确认，等待几分钟即可完成。

   > 创建完毕后，卷名称将自动修改为：`Install\ macOS\ Monterey`

   同样也支持 macOS Big Sur 11 系列，已经准备好 macOS Big Sur 镜像，打开 “终端”，执行如下命令：

   ```bash
   sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/sysin
   ```

2. OpenCore Patcher 设置

   打开 OpenCore Patcher，点击 “Settings”，勾选 “Verbose”，这样在启动系统安装过程中会输出详细信息，以便排错。

   ![Verbose](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/301.webp)

   > 有读者反馈，某些机型勾选 “Verbose” 无法正常启动，如果勾选有异常，请尝试取消勾选。

   一般在需要安装的 Mac 上运行（或称为目标 Mac），也可以为另外一台 Mac 为其他 Mac 创建安装介质，点击 “Settings”，下拉选择对应的机型，如图：

   ![Models](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/302.webp)

   > 这里是以 “型号标识符” 来表示机型，可以通过点击系统菜单栏  > “关于本机”，点击（ “概览” 标签页中的）“系统报告…”，此时打开 “系统信息” 可以看到 “型号标识符”。

3. Build and Install OpenCore（构建和安装 OpenCore）

   ![Build and Install OpenCore](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/303.webp)

   在 OpenCore-Patcher 主界面点击 “Build and Install OpenCore” 按钮，在出现的画面点击 “Build OpenCore”

   Build 成功后，如图，点击 “Install OpenCore”

   ![Install OpenCore](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/304.webp)

   选择要安装的磁盘，如下图，disk0 为系统内存磁盘，如果默认分区，USB 存储设备通常为 disk1，如果有两块磁盘，或者多个 USB 存储设备，都会列出，本例中 disk4 是一块 USB SSD，点击即可。

   ![Select Disk](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/305.webp)

   出现 EFI 分区选择界面，点击即可。

   ![Select Partition](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/306.webp)

4. 启动 OpenCore 和 macOS

   现在重新启动 Mac，按住 “Option” 键不放，直到出现启动选择画面，选择带有 OpenCore 图标的 EFI Boot 条目（按住  `Control`  键将使其成为默认启动项，可以忽略，安装后任务将解决默认启动问题）。

   ![EFI Boot](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/307.webp)

   您已经加载了 OpenCore，出现如下 OpenCore Picker（启动选择器）画面：

   ![OpenCore Picker](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/308.webp)

   本例中选择 Install macOS Big Sur（或者是 Install macOS Monterey），经过详细的字符输出信息，将启动到正常的 macOS 安装画面。

   正常安装步骤这里不在赘述，可以参看：[如何在 Mac 和虚拟机上安装 macOS Big Sur 11 正式版](https://sysin.org/blog/how-to-install-macos-big-sur/)（也适用于 Monterey）。

   注意一点，**安装前请选择 “磁盘工具”，抹掉整个磁盘再全新安装**。虽然也可以进行升级安装，但是这些机型通常都比较老旧了，升级卡顿更佳明显，也可能出现一些未知问题。

   **MacBookPro11,3 注意** ：在启动 macOS Monterey 时，如果尚未安装加速补丁，则需要启动到安全模式。 [否则，由于缺少 Nvidia 驱动程序，您会遇到黑屏。](https://github.com/dortania/OpenCore-Legacy-Patcher/issues/522)

   - 在 OpenCore Legacy Patcher 的启动菜单中选择 macOS Monterey 时按住 Shift+Enter 可以启动安全模式。

## 3. 安装后任务

1. 再次下载 OpenCore Legacy Patcher

   现在已经正常登录新安装的系统，再次下载 OpenCore Legacy Patcher，同安装准备阶段。

2. 将 OpenCore 安装到内置存储中

   现在 OpenCore 是安装在 USB 存储的 EFI 分区，拔掉 USB 存储将无法正常启动，我们需要将 OpenCore 安装到 Mac 内置储存的 EFI 分区中，这样才能脱离 USB 存储正常启动。步骤与上文中 “构建和安装 OpenCore” 类似。

   运行 OpenCore Patcher，点击 Settings 根据需要更改设置；

   点击 “Build and Install OpenCore” 再次 “Build OpenCore”，“Install OpenCore” 时选择内置存储（通常是 disk0）并选择 EFI 分区；

   重启按住 Option，然后选择内部 EFI 分区，即可出现 OpenCore Picker（OpenCore 的启动选择画面），再次正常启动系统。

3. 无需 Verbose 或 OpenCore Picker 即可无缝启动

   运行 OpenCore Patcher 并点击 “Settings”，设置如下：

   ![OpenCore Settings](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/401.webp)

   再次 “Build and Install OpenCore” 同上 2，以使设置生效。

   > 现在要显示 OpenCore 选择器，您只需在单击 EFI 启动时按住 “ESC” 键，然后在看到左上角的光标箭头时松开 “ESC” 键。

4. 启用 SIP（一般忽略）

   对于许多用户而言，默认情况下会在构建时启用 SIP。 对于 Intel HD 4000 用户，您可能已经注意到 SIP 被部分禁用。 这是为了确保与 macOS Monterey 完全兼容，并允许它与旧操作系统之间无缝启动。 但是对于不打算启动 Monterey 的用户，您可以在 Settings - SIP Settings 下重新启用。

   注意：非 Metal GPU 的机器无法在 Big Sur 中启用 SIP，因为已修补根卷（Post Install Root Patch）

   启用 SIP  
   ![SIP Settings](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/402.webp)

   SIP 降低（根补丁）  
   ![SIP Settings](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/403.webp)

   SIP 禁用  
   ![SIP Settings](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/404.webp)

   如果您不确定是否应该启用 SIP，请保持原样。

   已经运行 Post Install Root Patch 的系统无法在不破坏当前安装的情况下启用 SIP。

5. 运行 “Post Install Root Patch”

   对于使用不受支持的 GPU/wifi 卡的用户，您需要运行 Post Install Root Volume 补丁以恢复功能。

   OpenCore-Patcher 中点击 “Post Install Root Patch”，会列出需要修补的功能。

   ![Root Patch](https://sysin.cn/blog/install-macos-12-on-unsupported-mac-opencore/405.webp)

   点击 “Start Root Patching” 开始修复（如果无需修复，该按钮灰色不可用）。

   修补成功后会提示重启系统生效。

   支持以下型号的 GPU 和无线网卡：

   Unsupported GPUs in macOS Big Sur

   - Nvidia:
     - Tesla (8000 - 300 series)
   - AMD:
     - TeraScale (2000 - 6000 series)
   - Intel:
     - Iron Lake
     - Sandy Bridge (2000 - 3000 series)

   Unsupported GPUs in macOS Monterey

   - Nvidia:
     - Tesla (8000 - 300 series)
     - Kepler (600 - 800 series)
   - AMD:
     - TeraScale (2000 - 6000 series)
   - Intel:
     - Iron Lake
     - Sandy Bridge (2000 - 3000 series)
     - Ivy Bridge (4000 series)

   Unsupported Wireless Cards in macOS Monterey

   - Broadcom:
     - BCM94328
     - BCM94322
   - Atheros

## 4. 解决遗留加速问题

产品团队已经总结了一些常见的问题及其解决方案，如果遇到相关问题请点击以下链接查看（英文）。

- [破碎的背景模糊](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#broken-background-blurs)
- [下载较旧的非 Metal 应用程序](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#downloading-older-non-metal-apps)
- [无法运行缩放](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#unable-to-run-zoom)
- [无法向应用授予特殊权限（例如相机访问缩放）](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#unable-to-grant-special-permissions-to-apps-ie-camera-access-to-zoom)
- [键盘背光坏了](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#keyboard-backlight-broken)
- [照片和地图应用程序严重失真](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#photos-and-maps-apps-heavily-distorted)
- [编辑侧边栏小部件时无法按 “完成”](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#cannot-press-done-when-editing-a-sidebar-widget)
- [在 macOS 11.3 和更高版本中的 AMD/ATI 从睡眠中唤醒严重失真](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#wake-from-sleep-heavily-distorted-on-amd-ati-in-macos-11-3-and-newer)
- [无法在 2011 15”和 17” MacBook Pro 上切换 GPU](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#unable-to-switch-gpus-on-2011-15-and-17-macbook-pros)
- [ATI TeraScale 2 GPU (HD5000/HD6000) 上的不稳定颜色](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#erratic-colours-on-ati-terascale-2-gpus-hd5000-hd6000)
- [无法允许 Safari 扩展](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#unable-to-allow-Safari-Extensions)
- [无法在 2011 年 15 英寸和 17 英寸 MacBook Pro 上登录](https://dortania.github.io/OpenCore-Legacy-Patcher/ACCEL.html#cannot-login-on-2011-15-and-17-macbook-pros)

## 5. 如何更新系统版本

根据项目描述应用该补丁是可以支持 OTA 系统更新的（系统偏好设置 - 软件更新），笔者并不推荐如此操作，老旧 Mac 本来性能是问题，这样升级会加剧系统卡顿，升级异常也未可知。

如果需要更新，我们需要重复上述步骤，使用新版的 macOS Monterey 镜像重新安装，只是在操作步骤中，不要抹掉分区，直接选择原来的分区进行安装，将自动进行系统升级。

对于普通用户而已，一个大版本，如果使用没有问题，也无需考虑小版本升级，通常 x.5 版本流畅度和功能将达到相对完善状态，后续多为安全修复。

未尽事宜请访问项目主页：[OpenCore-Legacy-Patcher](https://github.com/dortania/OpenCore-Legacy-Patcher/)
