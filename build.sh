#!/usr/bin/env bash

set -e

echo 'pull...' && git pull origin develop && echo 'build...' && pnpm install && pnpm build && cp -rf ./dist/* blog && echo 'publish...' && python baidu.py "$(cat ./dist/sitemap.xml)" && curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=https://www.luojia.work&token=UyYCiIqczOmavRZ2" && rm -rf ./urls.txt dist
