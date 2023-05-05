---
title: docker-compose命令总结
date: 2021-04-30
category:
  - container
tag:
  - docker
  - docker-compose
---

## 概述

docker-compose 的是 docker 的编排工具，命令有很多，现总结如下。

## docker-compose command

### docker-compose 的格式

```bash
version: "3.9"
services:
  redis:
    image: redis:alpine
    ports:
      - "port"
    networks:
      - frontend
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    deploy:
      placement:
        constraints: [node.role == manager]

  vote:
    image: dockersamples/examplevotingapp_vote:before
    ports:
      - "5000:80"
    networks:
      - frontend
    depends_on:
      - redis
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
      restart_policy:
        condition: on-failure

  result:
    image: dockersamples/examplevotingapp_result:before
    ports:
      - "5001:80"
    networks:
      - backend
    depends_on:
      - db
    deploy:
      replicas: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  worker:
    image: dockersamples/examplevotingapp_worker
    networks:
      - frontend
      - backend
    deploy:
      mode: replicated
      replicas: 1
      labels: [APP=VOTING]
      restart_policy:
        condition: on-failure
        delay: 10s
        max_attempts: 3
        window: 120s
      placement:
        constraints: [node.role == manager]

  visualizer:
    image: dockersamples/visualizer:stable
    ports:
      - "8080:8080"
    stop_grace_period: 1m30s
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      placement:
        constraints: [node.role == manager]

networks:
  frontend:
  backend:

volumes:
  db-data:
```

### 命令行运行容器命令

```bash
docker-compose -f compose_file -p project_name
```

### up

```bash
docker-compose up -d service_name
docker-compose up -d --scale service_name=3 service_name
docker-compose -f compose_file -p project_name up -d service_name
cat compose_file | docker-compose -f - up -d service_name
```

### down

```bash
docker-compose -f compose_file -p project_name down
```

### kill

```bash
docker-compose kill -s service_name
```

### logs

```bash
docker-compose logs service_name
```

### port

```bash
docker-compose port service_name export_port
```

### ps

```bash
docker-compose ps -q service_name
```

### pull

```bash
docker-compose pull service_name
```

### restart

```bash
docker-compose restart -t 5 service_name
```

### rm

```bash
docker-compose rm -f -v service_name
```

### run

```bash
docker-compose run service_name cmd
# --service-ports export port
docker-compose run --service-ports service_name cmd
# port mapping
docker-compose run -p service_name cmd
```

### start

```bash
docker-compose start service_name
```

### stop

```bash
docker-compose stop -t 5 service_name
```

### config

```bash
docker-compose config
```

### exec

```bash
docker-compose exec container_name cmd
docker-compose exec --index 2 -e key=value container_name cmd
```

### images

```bash
docker-compose images
```

### pause

```bash
docker-compose pause service_name
```

### unpause

```bash
docker-compose unpause service_name
```

### top

```bash
docker-compose top service_name
```

### version

```bash
docker-compose version
```
