# gulp-md5-plus

> md5 plugin for [gulp](https://github.com/wpfpizicai/gulp-md5-plus) ,md5 the static files(eg javascript style image files) ;then replace the filenames in css or the html if needed by passing the file or dir in the second parameter

## Usage

First, install `gulp-md5-plus` as a development dependency:

```shell
npm install --save-dev gulp-md5-plus
```

Then, add it to your `gulpfile.js`:

```javascript
var md5 = require("gulp-md5-plus");

gulp.src("./src/*.css")
	.pipe(md5(10,'./output/index.html'))
	.pipe(gulp.dest("./dist"));
```

md5 all css files in the src folder and change these css names in the quoted html--index.html

```javascript

gulp.task('img' ,function() {
    var imgSrc = './static/img/**',
        quoteSrc = './output/static/css/**/*.css', // [./output/static/css/**/*.css',./output/static/js/**/*.js']
        imgDst = './output/static/img';

    return gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(md5(10 ,quoteSrc))
        .pipe(gulp.dest(imgDst));
});

```

first, optimize all images in the img folder including all sub folders; then md5 all these images and change these images' names in the quoted css files ;
####note
the directory of the md5ed files in the imgDst folder is the same as that of original files in the imgSrc folder; and css files can refer the image file with the same name in different folder rightly;

## API

### md5(size,file)

#### size
Type: `String`
Default: null

Optionnal: you can pass the size to limit the size of the hash that is appended.

#### file
Type: `String`
Default: null

Optionnal: the file need to replace the file name of the md5ed files. dir is also supported

Example:
```javascript
	gulp.src('static/js/*')
        .pipe(md5(10,'./output/html'))
        .pipe(gulp.dest('./output'));
```

The sample above will append the md5 hash(length : 10) to each of the file in the static/js folder then repalce the link file name in the output/html/ using md5ed file name; at last store all of that into the *output* folder.



## License

http://en.wikipedia.org/wiki/MIT_License[MIT License]


