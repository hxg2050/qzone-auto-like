# QQ空间自动点赞

基于puppeteer的QQ空间自动点赞程序

## 运行环境
1、linux + bun  
2、mac + bun

## bun安装
如果安装有nodejs，直接运行`npm install bun -g`全局安装bun即可  
或者查看[bun官网](https://bun.sh/)安装文档

## 安装
1、克隆本程序到本地，运行`bun install`安装依赖  
2、配置chrome运行目录  
本地查看chrome路径，打开浏览器输入`chrome://version`  
![帮助文件](/1.png "Magic Gardens")

`
注意linux上运行需要安装中文字体
`

## 配置
```sh
// 浏览器可执行路径
CHROME_PATH = /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
// 开启关闭无头模式
HEADLESS = false
```

## 开发模式
```sh
bun dev
```

## 服务器运行
```sh
bun start
```

## pm2 运行
```sh
pm2 start pm2.config.cjs
```

## 使用方式
启动程序后，浏览器输入`http://ip:8080`查看登陆二维码，如果要修改端口可打开`src/imageServer.ts`修改端口  
登陆二维码只会生效一次，请及时消费，如果长时间没有扫码需要重启程序，重新生成二维码

程序运行后会在目录下生成一张空间截图，路径为`page.png`
---
### 结尾广告: 接一切软件开发
```
我们也能助您一臂之力
了解我们如何帮助您解决挑战。立即与我们联系。

作者(游侠)qq: 243802688
```