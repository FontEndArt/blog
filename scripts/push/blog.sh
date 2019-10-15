#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 如果是发布到自定义域名
echo '# 前端进阶与被虐笔记'  >> README.md
echo '作者：武浩然@前端小然子'  >> README.md
echo '地址：[https://xiaoranzife.com](https://xiaoranzife.com 前端进阶与被虐笔记)'  >> README.md

git add .
git commit -m "$1"

# 如果发布到 https://<USERNAME>.github.io
git push -f https://github.com/FontEndArt/FontEndArt.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -