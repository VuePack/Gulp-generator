# 移动端多页应用脚手架(支持路由)
## 目录

1. [安装](#install)
2. [工程目录规范](#directory)
3. [前置条件](#condition)
4. [解决问题](#question)
5. [前端技术要求](#foreend)
6. [如何使用](#help)
7. [功能](#function)
8. [不足之处](#deficiency)

<a name="install"></a>
## 1. 安装

**版本（全局安装）**：NODE ：8.5.0

由于 `npm` 安装源太慢，建议换成淘宝 `cnpm` 安装源

进入工程目录模块安装：

```
cnpm install

```

<a name="directory"></a>
## 2.工程目录规范
    |—— mode_modules                 npm 安装的模块
    |—— .eslintrc.js                 es6 代码规范配置文件
    |—— build                        构建项文件
    |—— config                       配置项文件
    |—— static                       静态目录
    |—— test                         单元测试目录
    |—— dist                         编译文件目录
    |—— src                          项目源文件
    |   |—— assets                   静态文件目录
    |   |   |—— style                样式文件
    |   |   |—— font                 字体文件
    |   |   |—— img                  图片文件
    |   |   |—— js                   第三方库
    |   |—— components               全局组件目录
    |   |—— config                   配置文件目录
    |   |   |—— api.js               接口 API 配置文件
    |   |—— module                   多页面文件目录
    |   |   |—— Member               多页面父级目录
    |   |   |   |—— component        Member 所属组件目录
    |   |   |   |—— Views            Member 所属路由目录
    |   |   |   |—— manage           Member 所属配置路由状态管理目录
    |   |   |   |—— member.html      单个页面配置 html
    |   |   |   |—— member.js        单个页面配置 js
    |   |   |   |—— app.vue          单个页面配置 vue
    |   |—— util                     公共函数调用目录
    |   |   |—— ajax.js              公共函数

## 3.  前置条件

* `NPM` 管理依赖库，第三方的 `js` 文件放在 `assets/js` 下
* 主要技术 `Vue`，`JavaScript`，`ES6`
* 创建新的多页面，必须在 `module` 目录下

*格式如下:*

    |—— module                       多页面文件目录
    |   |—— Member                   多页面父级目录
    |   |   |—— components           Member 所属组件目录
    |   |   |—— Views                Member 所属路由目录
    |   |   |—— manage               Member 所属配置路由状态管理目录
    |   |   |—— member.html          单个页面配置 html
    |   |   |—— member.js            单个页面配置 js
    |   |   |—— app.vue              单个页面配置 vue

<a name="question"></a>
## 4. 解决问题

* 减少 `css`，`js`文件请求数，跟据文件名 `hash` 方式清除缓存，图片小于10k转换 `base64` 格式
* 解决 `webpack` 打包体积过的问题，使用处理分包的机制
* 页面热加载模式，文件改变后自动同步多设备浏览器
* `vue` 多页面的搭建，自动添加并替换页面里的文件路径
* 处理 `js` 多模块合并、压缩、打包
* 多页应用支持路由
* 前后端正式分离开发与正式环境

<a name="foreend"></a>
## 5. 前端技术要求

* 略懂`linux`，`nodejs`，`webpack`，`git`，`es6`，`vue`

<a name="help"></a>
## 6. 如何使用

* 默认请开启本地服务器 `127端口`
* 多页应用，`module` 目录下创建多个父级目录实例多个 `html`
* 统一 `ajax` 库为 `axios`
* 图标统一用 `iconfont` ，托管在 **http://www.iconfont.cn/** 在线生成阿里 `CDN`，`font.css`
* 项目使用 `es6` 开发，代码书写规范按照 `.eslintrc.js`
* 移动端尺寸适配，按照淘宝flexible适配方案。由于引入YDUI库，视觉稿按照750适配，rem计算方式：设计图尺寸px / 100 = 实际rem  【例: 100px = 1rem，32px = .32rem】

```css
// border 1PX适配
{
  border-top: 1px solid #c9c9c9;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
```


> 开发
  ```js
  npm run dev
  ```

* 默认执行 `module/Index` 目录下访问 **http://localhost:9090/index.html**

> 发布
  ```js
  npm run build
  ```

<a name="function"></a>
## 7. 功能

- ajax库添加全局拦截动画
- 倒计时js组件
- tabbar等ui组件
- 表单验证

<a name="deficiency"></a>
## 8. 不足之处

* 完美

