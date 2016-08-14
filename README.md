# vue-gulp-webpack-generator


结构图：

├── dist
│   ├── css
│   ├── html
│   ├── fonts
│   ├── js
│   ├── maps	
├── src
│   ├── html
│   ├── img
│   ├── js			
│   ├── script  //.vue目录
│   └── style		
├── node_modules
├── package.json
├── webpack.config.js
└── gulpfile.js


## webpack负责打包JS模块，Gulp负责多任务的定制

1.文件监听，本地服务器实时编译自动刷新
2.webpack处理JS多模块合、压缩、打包
3.Gulp处理SCSS的编译、压缩、合并、兼容前缀、md5
4.html动态更新img,css,js的更新
5.webpack编译.vue的模块开发
6.gulp-include，html代码的可复用开发


## porject
> A vue project.

## Development

```shell
gulp build
```

## Production
```
gulp dev
```

## License
ISC

