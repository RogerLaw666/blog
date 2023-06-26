---
title: redis高级笔记8 - Redis_Jedis_实例
date: 2022-06-27
category:
  - database
tag:
  - redis
prev: redis高级笔记7 - Redis_Jedis_测试
next: redis高级笔记9 - Redis与Spring Boot整合
---

## 八、Redis*Jedis*实例

### 8.1 完成一个手机验证码功能

要求:

1. 输入手机号，点击发送后随机生成 6 位数字码，2 分钟有效

2. 输入验证码，点击验证，返回成功或失败

3. 每个手机号每天只能输入 3 次

![wpsSFXU9l.png](./images/wpsSFXU9l.png)
