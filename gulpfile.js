/*
* @Author: leon
* @Date:   2016-08-15 01:51:38
* @Last Modified by:   kevinli
* @Last Modified time: 2016-08-15 01:52:19
*/


var gulp = require('gulp'),
  path = require('path'),
  watch = require('gulp-watch'), //监听文件变化
  px2rem = require('postcss-px2rem'), //- px转换rem
  sass = require('gulp-sass'), //- sass处理
  postcss = require('gulp-postcss'),//css管理
  autoprefixer = require('gulp-autoprefixer'), //- 添加兼容前缀
  cssnano = require('gulp-cssnano'), //-压缩css
  sourcemaps = require('gulp-sourcemaps'), //-添加map文件
  md5 = require("gulp-md5-plus"), //md5去缓存
  uglify = require('gulp-uglify'), //js压缩混淆
  concat = require('gulp-concat'), //文件合并all-in-one
  base64 = require('gulp-base64'), //把后缀#base64且小于32k的图片转换成base64
  uncss = require('gulp-uncss'), //根据html和引用的css删除冗余css样式
  webpack = require('webpack'),  //webpack模块化打包js
  webpackConfig = require("./webpack.config.js"),
  spritesmith = require('gulp.spritesmith'), //雪碧图
  rename = require("gulp-rename"),  // rename重命名
  del = require('del'),                        //删除
  gulpSequence = require('gulp-sequence'),  //同步任务
  gutil = require('gulp-util'),       //工具箱
  fileinclude = require('gulp-file-include'),//include引入
  browserSync = require('browser-sync').create();//自动刷新



var _htmlSrcFile = 'src/html/index.html', //需要处理的html文件
    _htmlSrcDir = 'src/html/',
    _scssArr = ['src/style/base/**.scss', 'src/style/component/*.scss'], //需要处理的scss数组
    _CssLibArr = 'src/style/lib/**.css',
    _jsArr = 'src/js/**/*.js', //需要处理的js数组
    _imgArr = [], //需要处理的img数组
    _imgSrcDir = 'src/img/**/*',
    _scriptSrcFile= 'src/script/**/*',

    _htmlDistFile = 'dist/html/index.html',
    _htmlDistDir = 'dist/html/',
    _imgDistDir = 'dist/img',
    _cssDistDir = 'dist/css/', //发布的css目录
    _cssMapsDir = 'dist/maps/', // 发布的cssMaps目录
    _cssDistName = 'home.min.css'; //发布的css名称


//本地服务器，文件监测，实时刷新编译打包
gulp.task('watch',['includeTask'],function(callback){
    browserSync.init({
        notify: true,
        open: true,
        // proxy: "127.0.0.1:8000"
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch(_htmlSrcDir + '/**/*.html',['buildTask']).on("change", browserSync.reload);
    gulp.watch(_scssArr, ['buildTask']).on("change", browserSync.reload);
    gulp.watch(_jsArr, ['buildTask']).on("change", browserSync.reload);
    gulp.watch(_scriptSrcFile, ['buildTask']).on("change", browserSync.reload);

});

//用于在html文件中引入include文件
gulp.task('includeTask', function (done) {
    gulp.src(['src/html/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist/html'))
        .on('end', done);
});

// css雪碧图，生成的雪碧图和对应的css，需手动替换
gulp.task('sprite', function() {
  var spriteData = gulp.src(_imgArr)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }));
  return spriteData.pipe(gulp.dest('dist/sprite/'));
});

//scss预处理（合并，解析，兼容前缀，压缩，sourcemaps）
gulp.task('scssTask', function() {
  var processors = [px2rem({remUnit: 75})];
  gulp.src(_scssArr)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(concat(_cssDistName))
    .pipe(autoprefixer({
        browsers: ['Firefox >= 20','> 5%','last 2 versions', ],
        cascade: true,
        remove:true
    }))
    .pipe(postcss(processors))
    .pipe(base64({extensions: [/\.(jpg|png)#base64/i]}))
    .pipe(cssnano()) //-压缩css
    .pipe(rename(_cssDistName))
    .pipe(sourcemaps.write(path.relative(_cssDistDir, _cssMapsDir), {
      sourceMappingURL: function(file) {
        return '/' + _cssMapsDir + file.relative + '.map';
      }
    }))
    .pipe(gulp.dest(_cssDistDir))
    .pipe(md5(10, _htmlDistFile))

  //默认src下lib目录的css文件输出到dist
  gulp.src(_CssLibArr)
    .pipe(gulp.dest(_cssDistDir))
});

// webpack打包js
gulp.task("buildJS", function(callback) {
    var myConfig = webpack(Object.create(webpackConfig));

    myConfig.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:buildJS", err);
        gutil.log("[webpack:buildJS]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//将图片拷贝到发布目录
gulp.task('imgTask', function (done) {
    gulp.src([_imgSrcDir]).pipe(gulp.dest(_imgDistDir)).on('end', done);
});


//指定webpack打包文件添加mad5
gulp.task('webpackTask', ['buildJS'], function() {
  gulp.src('dist/js/init.min.js')
    .pipe(md5(10, _htmlDistFile));
});

//打包编译
gulp.task('buildTask',['includeTask'], function(callback){
    gulpSequence('scssTask', 'webpackTask','imgTask')(callback)
    console.log('-------------SCSS编译，JS打包完成-------------')
});

//清除文件
gulp.task('clean', function(){
    del([_cssDistDir,_jsDistDir]);
})

//打包编译
gulp.task('build', ['buildTask']);

//开发任务
gulp.task('dev', ['watch']);

