---
title: redis学习笔记4 - 详细配置
date: 2022-06-24
category:
  - database
tag:
  - redis
prev: redis学习笔记3 - 启动
next: redis学习笔记5 - 启动方式
---

## 四、Redis 配置详细

Redis 默认定义了很多默认配置。但在实际开发中，一般我们都会通过手动配置完成。回到安装目录下找到解压文件中的 redis.conf。

Redis 的配置文件位于 Redis 安装目录下，文件名称为 redis.conf

### 4.1 配置 Redis

命令: 解压目录下的 redis.conf 配置文件复制到安装文件的目录下

```bash
#把编译的redis.conf文件放 ，安装的redis文件目录下
pwd
/root/apps/redis-5.0.8
cp redis.conf /root/apps/redis
cd ..
ll
```

### 4.2 Redis.conf

1. Redis 默认不是以守护进程的方式运行，可以通过该配置项修改，使用 yes 启用守护进程
   daemonize no

2. 当 Redis 以守护进程方式运行时，Redis 默认会把 pid 写入/var/run/redis.pid 文件，可以通过 pidfile 指定
   pidfile /var/run/redis.pid

3. 指定 Redis 监听端口，默认端口为 6379；
   port 6379

4. 绑定的主机地址
   bind 127.0.0.1

5. 当客户端限制多长时间后关闭连接，如果指定为 0，表示关闭该功能
   timeout 300

6. 指定日志记录几倍，Redis 总共支持四个级别: debug，verbose，notice，warning，默认为 verbose
   loglevel verbos

7. 日志记录方式，默认为标准输出，如果配置 Redis 为守护进程方式运行，而这里又配置日志记录方式标准输出，则日志将会发送给/dev/null
   logfile stdout

8. 设置数据库的数量，默认数据库为 0，可以使用 SELECT \<dbid\> 命令在连接上指定数据库 id
   databases 16

9. 指定在多长时间内，有多少次更新操作，就将数据同步到数据文件，可以多个条件配合
   save \<seconds\> \<changes\>
   Redis 默认配置文件中提供了三个条件
   save 900 1
   save 300 10
   save 60 10000
   分别表示 900 秒(15 分钟)内有 1 个更改，300 秒(5 分钟)内有 10 个更改以及 60 秒内有 10000 个更改。

10. 指定存储至本地数据库时是否压缩数据，默认为 yes，Redis 采用 LZF(压缩算法)压缩，如果为了节省 CPU 时间，可以关闭该选项，但会导致数据库文件变的巨大
    rdbcompression yes

11. 指定本地数据库文件名，默认为 dump.rdb
    dbfilename dump.rdb

12. 指定本地数据库存放目录
    dir ./

13. 设置当本机为 slav 服务时，设置 master 服务的 IP 地址及端口，在 Redis 启动时，它会自动从 master 进行数据同步 slaveof \<masterip\> \<masterport\>

14. 当 master 服务设置了密码保护时，slav 服务连接 master 的密码
    masterauth \<master-password\>

15. 设置 Redis 连接密码，如果配置了连接密码，客户端在连接 Redis 是需要通过 AUTH \<password\> 命令提供密码，默认关闭
    requirepass foobared

16. 设置同一时间最大客户端连接数，默认是无限制，Redis 可以同时打开的客户端连接数为 Redis 进程可以打开的最大文件描述符数，如果设置 maxclients 0，表示不作限制。当客户端连接数到达限制是，Redis 会关闭新的连接并向客户端返回 max number of clients reached 错误信息
    maxclients 128

17. 指定 Redis 最大内存限制，Redis 在启动时会把数据加载到内存中，达到最大内存后，Redis 会先尝试清除已到期或即将到期的 Key，档次方法处理后，仍然达最大内存设置，将无法再进行写入操作，但仍然可以静心读取操作。Rdis 新的 vm 机制，会把 key 存放内存，Value 会存放在 swap 区
    maxmemory \<bytes\>
    maxmemory-policy noeviction # 内存达到上限之后的处理策略

    - volatile-lru: 只对设置了过期时间的 key 进行 LRU（默认值）
    - allkeys-lru: 产出 lru 算法的 key
    - volatile-random: 随机删除即将过期 key
    - allkey -random: 随机删除
    - volatile-ttl: 删除即将过期的
    - noeviction: 永不过期，返回错误

18. 指定是否每次更新操作后进行日志记录，Redis 在默认情况下是异步的把数据写入磁盘，如果不开启，可能会在断电时导致一端时间内的数据丢失。因为 redis 本省同步数据文件是按上面 save 条件来同步的，所有的数据会在一端时间内只存在于内存中。默认为 no
    appendonly no

19. 指定更新日志文件名，默认为 appendonly.aof
    appendfulename appendonly.aof

20. 指定更新日志条件，共有 3 个可选值:
    no: 表示等操作系统进行数据缓存同步到磁盘(快)
    always: 表示每次更新操作后活动调用 fsync()将数据写到磁盘(慢，安全)
    everysec: 表示每秒同步一个(折中，默认值)
    appendfsync everysec

21. 指定是否启用虚拟内存机制，默认为 no，简单的介绍一下，vm 机制将数据分页存放，有 Redis 将访问量较少的页即冷数据 swap 到磁盘上，访问多的页面由磁盘自动换出到内存中(在后面的文章会仔细分析 Redis 的 vm 机制)
    vm-enabled no

22. 虚拟内存文件路径，默认值为/tmp/redis.swap，不可多个 Redis 实例共享
    vm-swap-file /tmp/redis.swap

23. 将所有大于 vm-max-memory 的数据存入虚拟内存，无论 vm-max-memory 设置多小，所有索引数据都是内存存储的(Redis 的索引数据 就是 keys)，也就是说，当 vm-max-memory 设置为 0 的时候，其实是所有 value 都存在于磁盘。默认值为 0
    vm-page-size 32

24. Redis swap 文件分成了很多的 page，一个对象可以保存咱几多个 page 上面，但一个 page 上不能被多个对象共享，vm-page-size 是要根据存储的 数据大小来设定的，作者建议如果村粗很多小对象，page 大小最好设置为 32 或者 64bytes；如果存储很大大对象，则可以使用更大的 page，如果不确定，就是用默认值
    vm-page-size 32

25. 设置 swap 文件中的 page 数量，由于页表(一种表示页面空闲或是欧诺个的 bitmap)是放在内存中的，在磁盘上每 8 个 pages 将消耗 1byte 的内存
    vm-pages 134217728

26. 设置访问 swap 文件的线程数，最好不要超过机器的核数，如果设置为 0，那么所有对 swap 文件的操作都是串行的，可能会造成比较长时间的延迟。默认值为 4
    vm-max-threads 4

27. 设置在向客户端应答时，是否把较小的包含并未一个包发送，默认为开启
    glueoutputbuf yes

28. 指定在超过一定的数量或者最大的元素超过某一临界值时，采用一种特殊的哈希算法
    hash-max-zipmap-entries 64
    hash-max-zipmap-value 512

29. 指定是否激活重置哈希。默认为开启(后面在介绍 Redis 的哈希算法时具体介绍)
    activerehasing yes

30. 指定包含其他的配置文件，可以在同一主机上多个 redis 实例之间使用同一份配置文件，而同时各个实例又拥有自己的特定配置文件
    include /path/to/local.conf

### 4.2、内存中的维护策略

redis 作为优秀的中间缓存件，时常会存储大量的数据，即使采取了集群部署来动态扩容，也应该即使的整理内存，维持系统性能。

#### 4.2.1 在 redis 中有两种解决方案

- 为数据设置超时时间

```bash
//设置过期时间
expire key time(以秒为单位)--这是最常用的方式
setex(String key, int seconds, String value) --字符串独有的方式

1、除了字符串自己独有设置过期时间的方法外，其他方法都需要依靠expire方法来设置时间
2、如果没有设置时间，那缓存就是永不过期
3、如果设置了过期时间，之后又想让缓存永不过期没使用persist key
```

- 采用 LRU 算法动态将不用的数据删除

```bash
内存管理的一种页面置换算法，对于在内存中但又不用的数据块(内存块)叫做LRU，
操作系统会根据哪些数据属于LRU而将其移除内存而腾出空间来加载另外的数据。

```

1.**volatile-lru**: 设定超时时间的数据中，删除最不常使用的数据

2.**allkeys-lru**: 查询所有的 key 只能怪最近最不常使用的数据进行删除，这是应用最广泛的策略。

3.**volatile-random**: 在已经设定了超时的数据中随机删除。

4.**allkeys-random**: 查询所有的 key，之后随机删除。

5.**volatile-ttl**: 查询全部设定超时时间的数据，之后排序，将马上要过期的数据进行删除操作。

6.**noeviction**: 如果设置为该属性，则不会进行删除操作，如果内存溢出则报错返回。

7.**volatile-lfu**: 从所有配置了过去时间的键中驱逐使用频率最少的键

8.**allkeys-lfu**: 从所有键中驱逐使用频率最少的键

#### 4.2.2 自定义配置 redis

进入对应的安装目录:

```bash
/root/apps/redis
```

修改 redis.conf 配置文件 vim redis.conf（进入命令模式 通过/内容 查找相应字符串）

daemonize no 修改为 daemonize yes 守护进程启动
bind 127.0.0.1 注释掉 允许除本机 外的机器访问 redis 服务
requirepass 设置密码 设定数据库密码 (保证服务安全/有些情况下不设定密码是无法进行远程连接访问的)

Redis 采用的是单进程多线程的模式。当 redis.conf 中选项 daemonize 设置成为 yes 时，代表开启守护进程模式。在该模式下，redis 会在后台运行，并将进程 pid 号写入值 redis.conf 选项 pidfile 设置的文件中，此时 redis 将一直运行，除非手动 kill 该进程。但当 daemonize 选项设置为 no 时，当前界面将进入 redis 的命令行界面，exit 强制退出或者关闭连接工具（putty,xshell 等）都会呆滞 redis 进程退出。

服务端开发的大部分应用都是采用后台运行的模式

requirepass 设置密码。因为 redis 速度相当快，所以一台比较好的服务器下，一个外部用户在一秒内可以进行 15w 密码尝试，这意味你需要设定非常强大的密码来防止暴力破解。

可以通过 redis 的配置文件设置密码参数，这样客户端连接大 redis 服务就需要密码验证，这样可以让你的 redis 服务更加安全。
