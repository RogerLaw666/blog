---
title: docker命令总结
date: 2021-04-29
category:
  - container
tag:
  - docker
---

## 概述

docker 的命令有很多，包括容器，镜像，网络，存储卷等等，现总结如下。

## 基础

### Dockerfile 的格式

```bash
FROM ubuntu
LABEL maintainer="maintainer_name" email="email_address"
ARG name="arg"
RUN apt update && apt upgrade -y && apt install inetutils-ping net-tools
ONBUILD RUN echo "HELLO WORLD"
ADD sshd_config /etc/ssh/sshd_config
COPY sshd_config /etc/ssh/sshd_config
CMD ["/user/sbin/sshd", "-D"]
WORKDIR /tmp
ENV hello="HELLO"
USER root
VOLUME ["/tmp"]
HEALTHCHECK --interval=10s --timeout=10s --start-period=10s --retries=3 CMD wget -o - -q http://localhost
ENTRYPOINT ["/usr/sbin/sshd", "-D"]
```

### 命令行运行容器命令

```bash
docker run -it -dp 8080:80 -w /tmp -e hello="HELLO" -u root ubuntu bash
```

### docker images

```bash
docker images -a
docker images -f 'dangling=true'
docker images -q
```

### docker pull

```bash
# -a all version
docker pull -a $image_name
```

### docker push

```bash
docker push $image_name
```

### docker search

```bash
docker search $image_name
```

### docker build

```bash
docker build -t $new_image_name .
```

```bash
docker build -t $new_image_name - < $docker_file
```

```bash
docker build -f $docker_file .
```

```bash
docker build $docker_file_directory
```

```bash
# don't remove temp image
docker build --rm=false
```

### docker rmi

```bash
docker rmi -f $image_name
docker rmi `docker images -aq`
docker rmi `docker images -qf dangling=true`
```

### docker history

```bash
docker history $image_name
```

### docker tag

```bash
docker tag $image_name $new_image_name
docker tag $image_name $new_image_name:$new_image_tag
```

### docker export

```bash
docker export -o $path_to_file $container_name
docker export $container_name > $path_to_file
```

### docker import

```bash
docker import $path_to_file $new_image_name
docker import - $new_image_name < $path_to_file
cat $path_to_file | docker import - $new_image_name
tar -c . | docker import - $new_image_name
docker import http://www.example.com/file
```

### docker save

```bash
docker save -o $path_to_file $image_name
docker save $image_name > $path_to_file
```

### docker load

```bash
docker load -i $path_to_file
docker load < $path_to_file
```

### docker cp

```bash
docker cp $local_path $container_name:$container_path
```

```bash
docker cp $container_name:$container_path $local_path
```

### docker commit

```bash
docker commit -m 'new image' $container_name $image_name
```

### docker create

```bash
# just create container, don't run
docker create $image_name
```

### docker diff

```bash
docker diff $container_name
```

### docker kill

```bash
docker kill -s KILL $container_name
docker kill `docker ps -q`
```

### docker logs

```bash
# follow
docker logs -f $container_name
# timestamp
docker logs -t $container_name
# last log
docker logs --tail=1 $container_name
# since
docker logs --since='2017-11-15' $container_name
```

### docker ps

```bash
docker ps
# all
docker ps -a
# numeric
docker ps -q
# size
docker ps -s
# latest
docker ps -l
# latest 2 containers
docker ps -n 2
# id name label status exited
# running created restarting paused exited
docker ps -f 'status=running'
```

### docker run

```bash
# 1.run mode
docker run -d -i -t $image_name
# 2.run param
docker run --name $image_name
docker run --cidfile=$path_to_file $image_name
# --pid --uts --ipc
docker run --pid= host rhel7 strace -p 1234 $image_name
# always no on-failure unless-stopped
docker run --restart=always $image_name
# run once
docker run --rm $image_name
# 3.network
# --dns --network --add-host --mac-address
# bridge container host none
docker run --network=bridge $image_name
# 4.other
# cmd
docker run $image_name cmd
# --entrypoint
docker run --entrypoint bash $image_name -c ls
# -p
docker run -p 80:5000 $image_name
# -P
docker run -P $image_name
# --link (it can get env from container_name in current container)
docker run --link $container_name:$container_alias $image_name
# -e
docker run -e key=value $image_name
# -v
docker run -v $outside_path:$inside_path $image_name
# volume-from
docker run --volume-from $data_container_name $image_name
# -u user
docker run -u $user_name $image_name
# -w workdir
docker run -w $workdir_name $image_name
# cpu mem
docker run -c 0 -m 128m $image_name
```

### docker start

```bash
# start container with interactive
docker start -i $container_name
```

### docker stop

```bash
docker stop -t 5 $container_name
```

### docker restart

```bash
docker restart -t 5 $container_name
```

### docker exec

```bash
# enter container
docker exec -it $container_name $path_to_container_bash
# file is local file
docker exec $container_name ls > $path_to_local_file
```

### docker attach

```bash
# enter container, stop container when quit
docker attach $container_name
```

### docker rename

```bash
docker rename $old_container_name $new_container_name
```

### docker rm

```bash
# remove all containers
docker rm `docker ps -aq`
# force remove volume and container
docker rm -fv $container_name
```

### docker pause

```bash
docker pause $container_name
```

### docker unpause

```bash
docker unpause $container_name
```

### docker wait

```bash
docker wait $container_name
```

### docker port

```bash
docker port $container_name
docker port $container_name $expect_port
```

### docker stats

```bash
docker stats $container_name
```

### docker top

```bash
docker top $container_name
```

### docker info

```bash
docker info
```

### docker version

```bash
docker version
```

### docker login

```bash
docker login
```

### docker logout

```bash
docker logout
```

### docker inspect

```bash
docker inspect $image_name|container_name
docker inspect -f '{{.property}}' $image_name|$container_name
docker instpct -f '{{index array 0}}' $image_name|$container_name
docker inspect -f '{{(index .HostConfig.PortBindings "5000/tcp" 0).HostPort}}' $web_container
docker inspect -f '{{json .property}}' $image_name|$container_name
```

### docker events

```bash
docker events --since '2017-11-15' --until '2018-11-15' --filter 'event=stop' --filter 'image=image_name' --filter 'container=container_name'
```

## 容器命令

### docker container attach

```bash
docker container attach $container_name
```

### docker container commit

```bash
docker container commit -m 'new image' $container_name $image_name
```

### docker container cp

```bash
docker container cp $local_path $container_name:$container_path
docker container cp $container_name:$container_path $local_path
```

### docker container create

```bash
docker container create $image_name
```

### docker container diff

```bash
docker container diff $container_name
```

### docker container exec

```bash
# enter container
docker container exec -it $container_name bash
# file is local file
docker container exec $container_name ls > $path_to_local_file
```

### docker container export

```bash
docker container export -o $path_to_file $container_name
```

### docker container inspect

```bash
docker container inspect $container_name
```

### docker container kill

```bash
docker container kill $container_name
```

### docker container logs

```bash
docker container logs $container_name
```

### docker container ls

```bash
docker container ls
```

### docker container pause

```bash
docker container pause $container_name
```

### docker container port

```bash
docker container port $container_name
```

### docker container prune

```bash
# remove all stopped containers
docker container prune $container_name
# force remove all stopped containers
docker container prune -f $container_name
```

### docker container rename

```bash
docker container rename $old_container_name $new_container_name
```

### docker container restart

```bash
docker container restart -t 5 $container_name
```

### docker container rm

```bash
docker container rm $container_name
```

### docker container run

```bash
docker container run $image_name
```

### docker container start

```bash
docker container start $container_name
```

### docker container stats

```bash
docker container stats $continer_name
```

### docker container stop

```bash
docker contianer stop $container_name
```

### docker container top

```bash
docker container top $container_name
```

### docker container unpause

```bash
docker container unpause $container_name
```

### docker container update

```bash
docker container update $container_name
```

### docker container wait

```bash
docker container wait $container_name
```

## 镜像命令

### docker image build

```bash
docker image build -t $new_image_name .
```

### docker image history

```bash
docker image history $image_name
```

### docker image import

```bash
docker image import $path_to_file $new_image_name
```

### docker image inspect

```bash
docker image inspect $image_name
```

### docker image load

```bash
docker image load -i $path_to_file
```

### docker image ls

```bash
docker image ls
```

### docker image prune

```bash
# remove all dangling images
docker image prune
# force remove all dangling images
docker image prune -f
# remove all images
docker image prune -a
```

### docker image pull

```bash
docker image pull $image_name
```

### docker image push

```bash
docker image push $image_name
```

### docker image rm

```bash
docker image rm $image_name
```

### docker image save

```bash
docker image save -o $path_to_file $image_name
```

### docker image tag

```bash
docker image tag $image_name $new_image_name
```

## 网络命令

### docker network create

```bash
docker network create superbridge
docker network create --driver bridge superbridge
docker run --net superbridge
```

### docker network ls

```bash
docker network ls
```

### docker network inspect

```bash
docker network inspect $network_name
docker network inspect bridge
```

### docker network connet

```bash
docker network connet bridge $container_name
```

### docker network prune

```bash
docker network prune
```

## 存储卷命令

### docker volume create

```bash
docker volume create $volume_name
```

### docker volume inspect

```bash
docker volume inspect $volume_name
```

### docker volume ls

```bash
docker volume ls
```

### docker volume prune

```bash
# remove all unused volumes
docker volume prune
# force remove all unused volumes
docker volume prune -f
```

### docker volume rm

```bash
docker volume rm $volume_name
```
