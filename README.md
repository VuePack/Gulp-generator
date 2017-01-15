# 移动端多页应用脚手架（非单页应用）
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

**版本（全局安装）**：NODE ：6.2.0， NPM ：3.8.9， webpack ：1.11.0

由于 `npm` 安装源太慢，建议换成淘宝 `cnpm` 安装源

进入工程目录模块安装：

```
cnpm install

```

<a name="directory"></a>
## 2.工程目录规范
    |—— mode_modules                 npm 安装的模块
    |—— .eslintrc.js                 es6 代码规范配置文件
    |—— server.js                    本地服务配置文件
    |—— webpack.config.js            webpack 配置文件
    |—— app                          项目源文件
    |   |—— assets                   静态文件目录
    |   |   |—— style                样式文件
    |   |   |—— font                 字体文件
    |   |   |—— img                  图片文件
    |   |   |—— lib                  第三方库
    |   |—— config                   配置文件目录
    |   |   |—— api.js               接口 API 配置文件
    |   |   |—— routes.js            路由配置文件
    |   |—— pages                    多页面文件目录
    |   |   |—— member               多页面父级目录
    |   |   |   |—— user             多页面子目录
    |   |   |       |—— app.html     单个页面配置 html
    |   |   |       |—— app.js       单个页面配置 js
    |   |   |       |—— app.vue      单个页面配置 vue
    |   |—— scripts                  vue 文件目录
    |   |   |—— components           vue 组件
    |   |   |—— view                 vue 视图
    |   |—— store                    vue 状态管理目录
    |   |—— util                     公共函数调用目录
    |   |   |—— ajax.js              公共函数
    |   |—— dist                     发布目录

## 3.  前置条件

* `NPM` 管理依赖库，第三方的 `js` 文件放在 `assets/lib` 下
* 主要技术 `Vue`，`JavaScript`，`ES6`
* 创建新的多页面，必须在 `pages` 目录下
  格式如下：

|—— pages                    多页面文件目录
    |—— member               多页面父级目录
    |   |—— user             多页面子目录
    |       |—— app.html     单个页面配置 html
    |       |—— app.js       单个页面配置 js
    |       |—— app.vue      单个页面配置 vue


<a name="question"></a>
## 4. 解决问题

* 减少 `css`，`js`文件请求数，跟据文件名 `hash` 方式清除缓存，图片小于10k转换 `base64` 格式
* 页面热加载模式，文件改变后自动同步多设备浏览器
* `vue` 多页面的搭建，自动添加并替换页面里的文件路径
* 处理 `js` 多模块合并、压缩、打包
* 前后端正式分离开发与正式环境

<a name="foreend"></a>
## 5. 前端技术要求

* 略懂`linux`，`nodejs`，`webpack`，`git`，`es6`，`vue`

<a name="help"></a>
## 6. 如何使用Ï

* 多页应用，`pages` 目录下创建多个父级目录实例多个 `html`
* 统一 `ajax` 库为 `axios`
* 图标统一用 `iconfont` ，托管在 **http://www.iconfont.cn/** 在线生成阿里 `CDN`
* 项目使用 `es6` 开发，代码书写规范按照 `.eslintrc.js`

> 开发
  ```js
  npm run dev
  ```

* 默认执行 `mobile` 目录下访问 **http://localhost:3000/mobile**

> 发布
  ```js
  npm run build
  ```

<a name="deficiency"></a>
## 7. 不足之处

* 完美

