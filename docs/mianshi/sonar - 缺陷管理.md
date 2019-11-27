# sonar - 缺陷管理

[sonarqube](https://www.sonarqube.org/)

一些机器发现不了的缺陷，比如内存泄漏什么的

## 软件包
下载社区版本（兼容各平台的压缩包）

jvm 12

openjdk

```
cd bin/对应系统/

sonar.sh 启动脚本
wrapper 包装器

./sonar.sh {console - 终端 | start - 后台 | stop | | restart | start | ... }

conf/

java风格的配置文件

配置项默认屏蔽，如果需要使用的话 就手动打开并配置
# sonar.jdbc.username=

官方建议的sql是
postgreSql

如果想要用mysql 就需要用到jdbc的配置

Sonar.jdbc.url=jdbc:mysql://xxx
还需要自己放进去lib什么的

数据库用来存放质量报告

```

如果感觉麻烦可以从dockerhub上拉下来，直接可以跑

给web的一些配置 Xmx是jvm的堆最大的内存 默认512m
sonar.web.javaOpts
sonar.web.host
sonar.web.port

工作线程、密钥 什么的一般保持默认

## Docker

官方提供了一个docker镜像


https://hub.docker.com/_/sonarqube/


$ docker pull sonarqube

$ docker run -d --name sonarqube -p 9000:9000 sonarqube

配置自定义的数据库（默认内置的）
$ docker run -d --name sonarqube \
    -p 9000:9000 \
    -e sonar.jdbc.username=sonar \
    -e sonar.jdbc.password=sonar \
    -e sonar.jdbc.url=jdbc:postgresql://localhost/sonar \
    sonarqube

配置文件映射到宿主机
$ docker run -d --name sonarqube \
    -p 9000:9000 \
    -v /path/to/conf:/opt/sonarqube/conf \
    -v /path/to/data:/opt/sonarqube/data \
    -v /path/to/logs:/opt/sonarqube/logs \
    -v /path/to/extensions:/opt/sonarqube/extensions \
    sonarqube

docker exec -it --user root sonarqube /bin/bash

默认用户名和口令都是admin

---

cli src config （token、忽略文件等）

后端是一个管理器，管理插件、报告、规则
配合客户端的项目的规则的配置

Rules 里面是各个语言的规范模版

Html 严格按照html5的规则来的

sonarqube 自身做不到自动化 只能和其他的自动化工具来做集成

客户端
[SonarScanner](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/#)

Sonar-project.properties

