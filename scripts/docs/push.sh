#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'xiaoranzife.com' > CNAME
cp ../../../README.md ./README.md
# echo '# 前端进阶与被虐笔记'  >> README.md
# echo '作者：武浩然@前端小然子'  >> README.md

git init
git add -A
git commit -m "build commit"

# 如果发布到 https://<USERNAME>.github.io
git push -f https://github.com/FontEndArt/FontEndArt.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -