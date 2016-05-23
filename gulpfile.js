var gulp = require('gulp'), //gulp
    browserSync = require('browser-sync').create(), //自动刷新
    runSequence = require('run-sequence'), //多任务扩展
    gulpif = require('gulp-if'), //if判断
    uglify = require('gulp-uglify'), //压缩JS
    sass = require('gulp-sass'), //编译SASS
    csslint = require('gulp-csslint'), //检查CSS
    rev = require('gulp-rev'), //更改版本名
    minifyCss = require('gulp-minify-css'), //压缩CSS
    imagemin = require('gulp-imagemin'), //压缩图片
    pngquant = require('imagemin-pngquant'),
    changed = require('gulp-changed'), //改变路径
    jshint = require('gulp-jshint'), //检查JS
    stylish = require('jshint-stylish'), //高亮显示
    revCollector = require('gulp-rev-collector'), //gulp-rev的插件，用于更改html里的资源引用路径
    htmlmin = require('gulp-htmlmin'); //压缩html
    autoprefixer = require('gulp-autoprefixer'), //添加浏览器私有前缀
    base64 = require('gulp-base64'), //图片base64
    del = require('del'); //删除文件


var cssSrc = 'src/sass/**/*.scss', //开发SASS目录
    fontSrc = 'src/fonts/*', //开发字体目录
    imgSrc = 'src/img/*', //开发图片目录
    jsSrc = 'src/js/**/*.js', //开发JS目录

    cssDest = 'dist/css', //发布CSS目录
    imgDest = 'dist/img', //发布图片目录
    fontDest = 'dist/font', //发布字体目录
    jsDest = 'dist/js', //发布JS目录

    cssRevSrc = 'src/css/revCss', //生成版本号json目录
    condition = true;


//编译SASS
gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass()).pipe(gulp.dest('src/css'));
});

// gulp.task('base64', function() {
//     return gulp.src('src/css/**/*.css')
//         .pipe(base64({
//             baseDir: 'src/img',
//             extensions: ['png'],//支持的格式
//             maxImageSize: 20*1024, // bytes 小于20kb转换为base64
//             debug: true
//         }))
//         .pipe(gulp.dest('dist/css'));
// });


//搭建本地服务器实时刷新
gulp.task('s', function() {
    runSequence(['sass']);
    browserSync.init({
        server: './src',
        notify: true, //刷新是否提示
        open: true, //是否自动打开页面
    });

    gulp.watch([
        '*.php',
        'src/js/**/*.js',
        'src/css/**/*.css',
        'src/**/*.html'
    ]).on("change", browserSync.reload);

    gulp.watch('src/sass/**/*.scss', ['sass']).on("change", browserSync.reload); // 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
});

//Fonts & Images 根据MD5获取版本号
gulp.task('revFont', function() {
    return gulp.src(fontSrc)
        .pipe(rev())
        .pipe(gulp.dest(fontDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/font'));
});

//生成图片版本号.json
gulp.task('revImg', function() {
    return gulp.src(imgSrc)
        .pipe(rev())
        .pipe(gulp.dest(imgDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/img'));
});

//生成css版本号.json
gulp.task('revScss', function() {
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(gulp.dest(cssDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/css'));
});

//压缩图片
gulp.task('miniImg', function() {
    return gulp.src('src/img/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            // optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: false, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});


//压缩JS/生成版本号.json
gulp.task('miniJs', function() {
    return gulp.src(jsSrc)
        .pipe(gulpif(
            condition, uglify({
                mangle: false, //类型：Boolean 默认：true 是否修改变量名
                compress: true, //类型：Boolean 默认：true 是否完全压缩
                preserveComments: 'false' //是否保留所有注释 false:不保留；all:保留所有注释
            })
        ))
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/js'));
});


//压缩/合并CSS/生成版本号.json
gulp.task('miniCss', function() {
    return gulp.src(cssSrc)
        .pipe(sass())
        .pipe(gulpif(
            condition, minifyCss({
                // compatibility: '!',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                compatibility: 'ie8',
                advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                keepBreaks: false //类型：Boolean 默认：false [是否保留换行]
            })
        ))
        .pipe(rev())
        .pipe(gulpif(
            condition, changed(cssDest)
        ))
        .pipe(autoprefixer({
            // browsers: [ "chrome 30", "Firefox < 20","ios_saf 8", "safari 8",'Android >= 2.3'],
            browsers: ['Firefox >= 20', '> 5%', 'last 2 versions'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        // .pipe(base64({
        //     extensions: ['svg', 'png', /\.jpg#datauri$/i],//支持的格式
        //     maxImageSize: 80*1024, // bytes 小于20kb转换为base64
        //     debug: true
        // }))
        .pipe(gulp.dest(cssDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/css'));
});

//CSS链接里更新引入文件版本号
gulp.task('revCollectorCss', function() {
    return gulp.src(['src/rev/**/*.json', 'src/css/**/*.scss'])
        .pipe(revCollector())
        .pipe(gulp.dest(cssRevSrc));
});


//压缩Html/更新引入文件版本
gulp.task('miniHtml', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: false, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src(['src/rev/**/*.json', 'src/**/*.html'])
        .pipe(revCollector())
        .pipe(gulpif(
            condition, htmlmin(options)
        ))
        .pipe(gulp.dest('dist'));
});


//检测JS
gulp.task('lintJs', function() {
    return gulp.src(jsSrc)
        //.pipe(jscs())   //检测JS风格
        .pipe(jshint({
            "undef": false,
            "unused": false
        }))
        //.pipe(jshint.reporter('default'))  //错误默认提示
        .pipe(jshint.reporter(stylish)) //高亮提示
        .pipe(jshint.reporter('fail'));
});

//检测CSS
gulp.task('lintCss', function() {
    return gulp.src(cssSrc)
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(csslint.failReporter());
});


//删除版本json文件和.scss文件
gulp.task('delRevCss', function() {
    del([cssRevSrc, cssRevSrc.replace('src/', 'dist/'), 'dist/css/**/*.scss']);
});

//清除缓存文件
gulp.task('clean', function() {
    del([cssRevSrc, cssRevSrc.replace('src/', 'dist/')]);
});


//正式构建
gulp.task('build', function(done) {
    runSequence(
        ['clean', 'revFont', 'revImg', 'revScss'], ['lintJs'], ['revCollectorCss'], ['miniCss', 'miniImg', 'miniJs'], ['miniHtml', 'delRevCss'],
        done);
});

//默认执行任务
gulp.task('default', ['build']);
