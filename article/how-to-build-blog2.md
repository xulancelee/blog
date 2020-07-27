[title]: <> (怎么搭一个博客：服务器环境搭建和技术栈的选择)
[description]: <> (购买了服务器之后，我们就开始考虑如何去搭建一个博客站点的环境和技术栈的选择)

![封面图](http://xulance.com/resource/202007/mind-flash.jpeg)
>封面图 来自[Pexels](https://www.pexels.com/zh-cn/)

## 技术栈和环境
因为我是一个纯前端出身的攻城狮，技术肯定是优先考虑使用Javascript的，因为现在有了Nodejs的存在，使用Js可以完成很多工作了。
  
如果是使用Nodejs做后端工作的话，我们就围绕这个点来展开就可以了。首先我们搭建服务器要考虑的，环境的搭载。  
首先我们需要一个代理转发的，我们首先考虑使用Nginx了，像其他那些代理工具Apache、Tomcat也是可以的，
但是我没用过所以不讨论，Nginx简单性能上也没问题。然后数据库的话也选择最简单的MySql就可以了，
如果你想用非关系型数据库MongoDb理论上也是可以的，这里也不展开讨论优劣，因为有能力的人可以自己选择。  

PS:以下教程来自网络，因为我自己的搭建过程已经完成，没有截图记录，在以后要搭环境的话再修正完善。

## Linux下安装Nginx 
转载标明出处，如有侵权，联系我删除  
[centOs7下安装Nginx](https://www.jianshu.com/p/97cdbeebef96)

## Linux下安装Nodejs  
以下内容来自Github [Nodejs/help](https://github.com/nodejs/help/wiki/Installation#how-to-install-nodejs-via-binary-archive-on-linux)  

1. 通过wget或者直接官网下载对应的二进制文件到服务器某目录下，我选择的是 `/tmp` 这是一个存放临时文件和数据的目录  
```shell script
#版本更新迭代，下载地址建议根据当前最新或自选版本下载路径安装
wget https://nodejs.org/dist/v14.6.0/node-v14.6.0-linux-x64.tar.xz
```

2.解压文件到你想安装的路径下，官方安装教程的推荐路径是 `/usr/local/lib/nodejs`  
```shell script
#$VERSION和$DISTRO会替换成变量，改成自己下载的版本和类型，或直接修改shell语句
VERSION=v14.6.0
DISTRO=linux-x64
sudo mkdir -p /usr/local/lib/nodejs
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 
```

3.添加环境变量到配置文件，官方指向 `~/.profile` 的路径实际上是 `/etc/profile`  
```shell script
#打开配置文件，可以用vi也可以用sftp工具来修改
vi /etc/profile

#将以下内容添加到文件末尾
# Nodejs
VERSION=v14.6.0
DISTRO=linux-x64
export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH
```

4.刷新配置  
```shell script
. /etc/profile
```

5.验证安装
```shell script
#正常显示版本号，而不是command not found就表示已经正常安装
node -v
npm -v
```

## Linux下安装MySql
转载标明出处，如有侵权，联系我删除  
[Linux下安装mysql-5.7.24](https://www.jianshu.com/p/276d59cbc529)

这个要注意数据库编码的问题，默认的数据库编码是不支持存储中文的，要修改默认的编码，可以找一下教程





