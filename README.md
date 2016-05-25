# Gulp-generator
Gulp基于sass，browserSync，autoprefixer，编译打包合并压缩检查自动生成版本号的脚手架

`Gulp自动添加版本号`
效果如下：
```js
"/css/style.css" => "/dist/css/style.css?v=34dfd31"
"/js/script.js" => "/dist/script.js?v=425d2134"
"/image.png"  => "/image.png?v=398dhfdj3"
```
1.安装gulp-rev、gulp-rev-collerctor
```bash
 npm install --save-dev gulp-rev
 npm install --save-dev gulp-rev-collector
```
2.打开`node_modules\gulp-rev\index.js`

第133行 `manifest[originalFile] = revisionedFile;`
更新为: `manifest[originalFile] = originalFile + '?v=' + file.revHash;`

3.打开 `nodemodules\gulp-rev\nodemodules\rev-path\index.js`

4.10行 `return filename + '-' + hash + ext;`
更新为: `return filename + ext;`

5.打开 `node_modules\gulp-rev-collector\index.js`
31行 `if ( path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !== path.basename(key) ) {`
更新为: `if ( path.basename(json[key]).split('?')[0] !== path.basename(key) ) {`


## 配置
- gulp 基础库
- browser-sync  自动刷新
- run-sequence   多任务扩展
- gulp-if   if判断
- gulp-uglify   压缩JS
- gulp-sass   编译SASS
- gulp-csslint   检查CSS
- gulp-rev   更改版本名
- gulp-minify-css   压缩CSS
- gulp-imagemin 压缩图片
- imagemin-pngquant 压缩图片配用
- gulp-changed   改变路径
- gulp-jshint   检查JS
- jshint-stylish   高亮显示
- gulp-rev-collector   gulp-rev的插件，用于更改html里的资源引用路径
- gulp-htmlmin 压缩html
- gulp-autoprefixer   添加浏览器私有前缀
- gulp-base64   图片base64
- del 删除文件



## 安装
`npm install`

## 使用
 - 测试热替换
   `gulp s`

 - 线上编译
    `gulp build`

  


## 结构图：

```
├── dist			//发布目录
│   ├── common  
│   ├── css
│   ├── img
│   ├── fonts
│   ├── js
│   └── index.html
├── src				//开发目录
│   ├── common  	//公共资源
│   ├── css			//编译完成css目录
│   ├── sass		//sass目录
│   ├── img			//图片目录
│   ├── fonts		//字体目录
│   ├── js			//JS文件目录
│   ├── rev			//版本号生成目录
│   └── index.html
├── node_modules	
├── package.json
└── gulpfile.js
```


