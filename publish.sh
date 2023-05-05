#!/usr/bin/env bash

set -e

git pull origin develop && ssh roger-cloud 'source $HOME/.zshrc && cd ~/Roger/Projects/blog && ./build.sh' && echo 'done'

# git pull origin develop && git push origin develop && echo 'build...' && pnpm install && pnpm build && tar -zcf dist.tar.gz dist && echo 'publish...' && scp ./dist.tar.gz roger-cloud:~/Roger/Projects/blog && python baidu.py "$(cat ./dist/sitemap.xml)" && curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=https://www.luojia.work&token=UyYCiIqczOmavRZ2" && echo '' && rm -rf ./urls.txt ./dist ./dist.tar.gz && ssh roger-cloud 'cd ~/Roger/Projects/blog && git pull origin develop && tar -zxf ./dist.tar.gz && cp -rf ./dist/* blog && rm -rf ./dist ./dist.tar.gz'