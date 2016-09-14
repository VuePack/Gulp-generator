/*
 * @Author: Leon
 * @Date:   2016-08-17 13:45:44
 * @Last Modified by:   kevin li
 * @Last Modified time: 2016-09-14 19:55:23
 */
var gulp          = require('gulp'), //基础库
sass              = require('gulp-ruby-sass'), //sass
postcss           = require('gulp-postcss'),//css管理
minifycss         = require('gulp-minify-css'), //css压缩
uglify            = require('gulp-uglify'), //js压缩
rename            = require('gulp-rename'), //重命名
concat            = require('gulp-concat'), //合并文件
clean             = require('gulp-clean'), //清空文件夹
minifyCss         = require('gulp-minify-css'), //压缩css
gulpif            = require('gulp-if'), //if语句
gulpSequence      = require('gulp-sequence'), //采用任务同步方式
rev               = require('gulp-rev'), //更改版本名
revCollector      = require('gulp-rev-collector'), //更改html模板引用路径
del               = require('del'), //删除
sftp              = require('gulp-sftp'), //sftp上传
browserSync       = require('browser-sync').create(), //自动刷新
reload            = browserSync.reload,
autoprefixer      = require('gulp-autoprefixer'), //- 添加兼容前缀
px2rem            = require('postcss-px2rem'), //淘宝适配px转换rem
runSequence       = require('run-sequence'), //同步任务
md5               = require('gulp-md5-plus'), //md5
webpack           = require('webpack'),//webpack
webpackDevConfig  = require("./webpack.dev.conf.js");//生产环境
webpackProdConfig = require("./webpack.prod.conf.js");//发布环境




var condition     = true,
    _srcHtmlFile = './index.html', //需要处理的html文件
    _allHtmlFile = './**/*.html',
    _srcHtmlPath = 'src/html/',
    _srcComponentCss = ['src/style/*.scss',  'src/style/component/*.scss'],
    _srcCommonCss = 'src/style/common/*.scss',
    _distCssPath      = 'dist/style/',
    _distMapFile = 'dist/js/*.map';

/**
 * 输出JS到发布目录
 */
gulp.task('build:js', function() {
    gulp.src("dist/js/*.js")
        .pipe(md5(10, _allHtmlFile))
        .pipe(browserSync.reload({ stream: true }));
});

/**
 * 公共文件
 */
gulp.task("build:common", function() {
    gulp.src("src/flash/**")
        .pipe(gulp.dest("dist/flash/"));

    gulp.src("src/fonts/**")
        .pipe(gulp.dest("dist/fonts/"));

    gulp.src("src/img/**")
        .pipe(gulp.dest("dist/img/"));

    gulp.src("src/style/lib/**")
        .pipe(gulp.dest("dist/style/"));

    gulp.src("src/js/public_lib/**")
        .pipe(gulp.dest("dist/js/public_lib/"));
});

/**
 * 编译scss
 */
gulp.task('build:scss', function() {
    // var processors = [px2rem({remUnit: 75})];

    //单独打包成common文件（公共）
    sass(_srcCommonCss, {
            style: 'expanded',
            // sourcemap: true
        })
        .on('error：', sass.logError)
        .pipe(gulpif(
            condition, minifyCss({
                compatibility: 'ie7'
            })
        ))
        .pipe(concat('common.min.css'))
        // .pipe(postcss(processors))
        .pipe(gulp.dest(_distCssPath))
        .pipe(md5(10, _allHtmlFile))
        .pipe(reload({ stream: true }));

    //单独打包成index文件（组件）
    sass(_srcComponentCss, {
            style: 'expanded',
            // sourcemap: true
        })
        .on('error：', sass.logError)
        .pipe(gulpif(
            condition, minifyCss({
                compatibility: 'ie7'
            })
        ))
        .pipe(concat('index.min.css'))
        .pipe(autoprefixer({
            browsers: ['Firefox >= 20','> 5%','last 2 versions' ],
            cascade: false,
            remove: false
        }))
        // .pipe(postcss(processors))
        .pipe(gulp.dest(_distCssPath))
        .pipe(md5(10, _allHtmlFile))
        .pipe(reload({ stream: true }));
});

/**
 * 生产环境包含sourcmap调试JS
 */
gulp.task("webpack:dev", function(callback) {
    var myConfig = Object.create(webpackDevConfig);
    // run webpack
    webpack(
        myConfig,
        function(err, stats) {
            callback();
        });
});

/**
 * 发布不包含sourcmap
 */
gulp.task("webpack:prod", function(callback) {
    var myConfig = Object.create(webpackProdConfig);
    // run webpack
    webpack(
        myConfig,
        function(err, stats) {
            callback();
        });
});

/**
 * 输出JS到发布目录（包含sourcemap）
 */
gulp.task('build:dev', function(callback) {
    runSequence('webpack:dev', 'build:js', callback);
});

/**
 * 输出JS到发布目录（不包含sourcemap）
 */
gulp.task('build:prod', function(callback) {
    runSequence('webpack:prod', 'build:js', callback);
});

/**
 * 删除map
 */
gulp.task('clear', function(callback) {
    del.sync([_distMapFile]);
});


//=======================================//


/**
 *启用开发环境
 */
gulp.task('watch', function(callback) {
    browserSync.init({
        notify: true, //刷新是否提示
        open: true, //是否自动打开页面
        server:{
          baseDir: "./"
        }
        // proxy: "127.0.0.1:8000" //代理ip域名

    });

    //默认修改JS文件，执行webpack输出编译文件，hash
    //默认修改.scss文件更新css ,hash
    //默认不监测html自动刷新，因为编译scss会自动给html加入hash值，会导致刷新多次
    gulp.watch('src/**/*.js', ['build:dev']);
    gulp.watch('src/**/*.vue', ['build:dev']);
    gulp.watch('src/**/*.scss', ['build:scss']);
    gulp.watch(_srcHtmlFile).on('change',reload);
});

/**
 *编译合并压缩的js,css输出发布目录
 */
gulp.task('build', function(callback) {
    runSequence('build:scss', 'build:prod', 'build:common', callback);
});

