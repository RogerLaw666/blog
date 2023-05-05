---
title: AWS cloudwatch跟踪ec2日志
date: 2021-08-12
category:
  - aws
tag:
  - cloudwatch
---

## 概述

Amazon CloudWatch 是一种面向开发运营工程师、开发人员、站点可靠性工程师 (SRE) 和 IT 经理的监控和可观测性服务。

下面记录如何跟踪 ubuntu ec2 实例的日志。

## 安装 aws cloudWatch agent

```bash
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
```

## 安装 collectd

```bash
sudo apt update && sudo apt install -y collectd
```

## 配置 aws cloudwatch agent

```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

## 设置以下策略到 ec2 的角色

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogStreams"
      ],
      "Resource": ["*"]
    }
  ]
}
```

## 配置 common-config.toml

```bash
sudo vi /opt/aws/amazon-cloudwatch-agent/etc/common-config.toml
```

```config
[credentials]
shared_credential_file = "/home/ubuntu/.aws/credentials"
```

## 启动 aws cloudwatch agent

```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json -s
```

## 查看运行状态

```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -m ec2 -a status
```
