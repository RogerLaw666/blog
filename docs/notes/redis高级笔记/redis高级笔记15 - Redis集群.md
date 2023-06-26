---
title: redis高级笔记15 - Redis集群
date: 2022-06-27
category:
  - database
tag:
  - redis
prev: redis高级笔记14 - Redis主从复制
next: redis高级笔记16 - Redis应用问题解决
---

## 十五、Redis 集群

### 15.1 问题

容量不够，redis 如何进行扩容？

并发写操作， redis 如何分摊？

另外，主从模式，薪火相传模式，主机宕机，导致 ip 地址发生变化，应用程序中配置需要修改对应的主机地址、端口等信息。

之前通过代理主机来解决，但是 redis3.0 中提供了解决方案。就是无中心化集群配置。

### 15.2 什么是集群

Redis 集群实现了对 Redis 的水平扩容，即启动 N 个 redis 节点，将整个数据库分布存储在这 N 个节点中，每个节点存储总数据的 1/N。

Redis 集群通过分区（partition）来提供一定程度的可用性（availability）: 即使集群中有一部分节点失效或者无法进行通讯， 集群也可以继续处理命令请求。

### 15.3 删除持久化数据

将 rdb,aof 文件都删除掉。

### 15.4 制作 6 个实例，6379,6380,6381,6389,6390,6391

#### 15.4.1 配置基本信息

​ 开启 daemonize yes

​ Pid 文件名字

​ 指定端口

​ Log 文件名字

​ Dump.rdb 名字

​ Appendonly 关掉或者换名字

#### 15.4.2 redis cluster 配置修改

​ cluster-enabled yes 打开集群模式

​ cluster-config-file nodes-6379.conf 设定节点配置文件名

​ cluster-node-timeout 15000 设定节点失联时间，超过该时间（毫秒），集群自动进行主从切换。

```properties
include /home/bigdata/redis.conf
port 6379
pidfile "/var/run/redis_6379.pid"
dbfilename "dump6379.rdb"
dir "/home/bigdata/redis_cluster"
logfile "/home/bigdata/redis_cluster/redis_err_6379.log"
cluster-enabled yes
cluster-config-file nodes-6379.conf
cluster-node-timeout 15000
```

#### 15.4.3 修改好 redis6379.conf 文件，拷贝多个 redis.conf 文件

![wpsHJosTE.png](./images/wpsHJosTE.png)

#### 15.4.4 使用查找替换修改另外 5 个文件

例如: :%s/6379/6380

#### 15.4.5 启动 6 个 redis 服务

![wps3jmGkU.png](./images/wps3jmGkU.png)

### 15.5 将六个节点合成一个集群

组合之前，请确保所有 redis 实例启动后，nodes-xxxx.conf 文件都生成正常。

![wpsgQNKrD.png](./images/wpsgQNKrD.png)

- 合体:

cd /opt/redis-6.2.1/src

```bash
redis-cli --cluster create --cluster-replicas 1 192.168.11.101:6379 192.168.11.101:6380 192.168.11.101:6381 192.168.11.101:6389 192.168.11.101:6390 192.168.11.101:6391
```

此处不要用 127.0.0.1， 请用真实 IP 地址

--replicas 1 采用最简单的方式配置集群，一台主机，一台从机，正好三组。

![wpsmU3Viv.png](./images/wpsmU3Viv.png)

![wpsdFtG2B.png](./images/wpsdFtG2B.png)

- 普通方式登录

可能直接进入读主机，存储数据时，会出现 MOVED 重定向操作。所以，应该以集群方式登录。

![wpsPROCBG.png](./images/wpsPROCBG.png)

### 15.6 -c 采用集群策略连接，设置数据会自动切换到相应的写主机

![wpsdvhQ5a.png](./images/wpsdvhQ5a.png)

### 15.7 通过 cluster nodes 命令查看集群信息

![wpsjQJy6v.png](./images/wpsjQJy6v.png)

### 15.8 redis cluster 如何分配这六个节点?

一个集群至少要有三个主节点。

选项 --cluster-replicas 1 表示我们希望为集群中的每个主节点创建一个从节点。

分配原则尽量保证每个主数据库运行在不同的 IP 地址，每个从库和主库不在一个 IP 地址上。

### 15.9 什么是 slots

[OK] All nodes agree about slots configuration.

> > > Check for open slots...
> > > Check slots coverage...

[OK] All 16384 slots covered.

一个 Redis 集群包含 16384 个插槽（hash slot）， 数据库中的每个键都属于这 16384 个插槽的其中一个，

集群使用公式 CRC16(key) % 16384 来计算键 key 属于哪个槽， 其中 CRC16(key) 语句用于计算键 key 的 CRC16 校验和 。

集群中的每个节点负责处理一部分插槽。 举个例子， 如果一个集群可以有主节点， 其中:

节点 A 负责处理 0 号至 5460 号插槽。

节点 B 负责处理 5461 号至 10922 号插槽。

节点 C 负责处理 10923 号至 16383 号插槽。

### 15.10 在集群中录入值

在 redis-cli 每次录入、查询键值，redis 都会计算出该 key 应该送往的插槽，如果不是该客户端对应服务器的插槽，redis 会报错，并告知应前往的 redis 实例地址和端口。

redis-cli 客户端提供了 –c 参数实现自动重定向。

如 redis-cli -c –p 6379 登入后，再录入、查询键值对可以自动重定向。

不在一个 slot 下的键值，是不能使用 mget,mset 等多键操作。

![wpszdwG2f.png](./images/wpszdwG2f.png)

可以通过{}来定义组的概念，从而使 key 中{}内相同内容的键值对放到一个 slot 中去。

![wpsTiprHP.png](./images/wpsTiprHP.png)

### 15.11 查询集群中的值

CLUSTER GETKEYSINSLOT \<slot\> \<count\> 返回 count 个 slot 槽中的键。

![wps095ctS.png](./images/wps095ctS.png)

### 15.12 故障恢复

如果主节点下线？从节点能否自动升为主节点？注意: 15 秒超时

![wpsAAZqC5.png](./images/wpsAAZqC5.png)

主节点恢复后，主从关系会如何？主节点回来变成从机。

![wpsBqm3Tu.png](./images/wpsBqm3Tu.png)

如果所有某一段插槽的主从节点都宕掉，redis 服务是否还能继续?

如果某一段插槽的主从都挂掉，而 cluster-require-full-coverage 为 yes ，那么 ，整个集群都挂掉

如果某一段插槽的主从都挂掉，而 cluster-require-full-coverage 为 no ，那么，该插槽数据全都不能使用，也无法存储。

redis.conf 中的参数 cluster-require-full-coverage

### 15.13 集群的 Jedis 开发

即使连接的不是主机，集群会自动切换主机存储。主机写，从机读。

无中心化主从集群。无论从哪台主机写的数据，其他主机上都能读到数据。

```java
public class JedisClusterTest {
  public static void main(String[] args) { 
     Set<HostAndPort>set =new HashSet<HostAndPort>();
     set.add(new HostAndPort("192.168.31.211",6379));
     JedisCluster jedisCluster=new JedisCluster(set);
     jedisCluster.set("k1", "v1");
     System.out.println(jedisCluster.get("k1"));
  }
}
```

### 15.14 Redis 集群提供了以下好处

实现扩容

分摊压力

无中心配置相对简单

### 15.15 Redis 集群的不足

多键操作是不被支持的

多键的 Redis 事务是不被支持的。lua 脚本不被支持

由于集群方案出现较晚，很多公司已经采用了其他的集群方案，而代理或者客户端分片的方案想要迁移至 redis cluster，需要整体迁移而不是逐步过渡，复杂度较大。
