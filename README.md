
----

# Vue-Gulp-Webpack前端脚手架
## 目录

1. [安装](#install)
2. [工程目录规范](#directory)
3. [前置条件](#condition)
4. [解决问题](#question)
5. [前端技术要求](#foreend)
6. [如何使用](#help)
7. [不足之处](#deficiency)

<a name="install"></a>
## 1. 安装

**版本**：NODE: v6.2.0 NPM: 3.8.9

由于npm安装源太慢，建议换成淘宝cnpm安装源

工程目录模块安装：

```
cnpm install

```

<a name="directory"></a>
## 2.工程目录规范
    |—— mode_modules                 npm安装的模块
    |—— gulpfile.js                  Gulp
    |—— webpack.dev.conf.js          webpack生产环境
    |—— webpack.prod.conf.js         webpack发布环境
    |—— index.html                   首页
    |   |—— src   开发目录
    |   |   |—— script           Vue代码
    |   |   |   |—— component    公共组件目录
    |   |   |—— js               js源代码
    |   |   |   |—— public_lib   第三方库
    |   |   |   |—— component    公共组件目录
    |   |   |   |—— lib    公共组件目录
    |   |   |   |—— xx.js        组件合成chunk.js
    |   |   |—— style            scss源代码
    |   |   |   |—— common         基础库
    |   |   |   |—— component    公共组件目录
    |   |   |   |—— lib          第三方库
    |   |   |—— img              scss源代码
    |   |   |—— flash            flash源文件
    |   |   |—— fonts            字体源文件
    |   |—— dist                 编译合并压缩后的js、css


## 3.  前置条件

* NPM管理第三方JS依赖，统一在 **LIB**文件导入，非NPM第三方插件放置 **public_lib**目录
* 此项目非前后端分离，故生产环境中每次都需要重新编译文件，输出发布目录
* 主要技术 vue.js ,jQuery,JavaScript;

<a name="question"></a>
## 4. 解决问题

* 减少css,js文件请求数，跟据文件名+MD5戳方式清除缓存，自动替换页面里的文件路径
* 无需动刷新页面，文件改变后自动同步刷新多设备浏览器
* Gulp处理SCSS的编译、压缩、合并、兼容前缀、md5
* webpack处理JS多模块合并、压缩、打包

<a name="foreend"></a>
## 5. 前端技术要求

* 略懂linux,nodejs,gulp,webpack,git

<a name="help"></a>
## 6. 如何使用
* Gulp：负责多任务的定制
* webpack：负责打包JS模块
* 公共组件共同导入的chunk父级文件，统一在webpack的 **config**配置引入

> 生产

    gulp watch ：//启动开发环境，监测文件动向，实时刷新编译
    gulp build:dev：//编译合并压缩js输出发布目录（包含sourceMap）
    gulp build:scss：//编译合并压缩scss输出发布目录
    gulp build:common：//公共文件输出发布目录
> 发布

    gulp build：//执行以上命令（不包含sourceMap）

<a name="deficiency"></a>
## 7. 不足之处

* 项目非前后端分离，现在的生产环境也可以是发布环境，每次都需要编译文件会有点慢
* **由于webpack的同步编译机制，js文件太大导致压缩缓慢**
* 默认不监测html自动刷新，因为编译scss会自动给html加入hash值，会导致刷新多次
* 暂时不支持scss的**devtool**调试
* .vue不是用webpack的热替换，会有些慢

