'use script';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var concat = require('gulp-concat');
var obfuscate = require('gulp-obfuscate');
var livereload = require('gulp-livereload');
var filter = require('gulp-filter');
var zip = require('gulp-zip');
var exec = require('child_process').exec;



//使用Node.js的子进程调用系统命令
gulp.task('start-server', function() {
    exec('supervisor ./bin/www', function(err) {
        if (err) {
            return err;
        }
    });
});


gulp.task('lib', function() {
    gulp.src([
            './webapp/lib/**/*',
        ], { base: './webapp/lib' })
        .pipe(gulp.dest('./public/lib/'));
});


gulp.task('default', ['clean'], function() {

    gulp.start('css', 'js', 'image', 'html','lib');


});


gulp.task('build', ['lib'], function() {
    gulp.src('./public/**')
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('./'));
});


gulp.task('reload', function() {
    gulp.src(['./webapp/css/**/*', './webapp/js/**/*', './webapp/images/**/*', './app/views/**/*'])
        .pipe(livereload());

});


gulp.task('watch', function() {
    livereload.listen();

    // gulp.watch('./webapp/Sass/**/*.scss', ['css'])
    //     .on('change', function(event) {
    //         console.log(event.path + "------Sass文件发生变化");
    //     });

    gulp.watch('./webapp/**/*.js', ['js'])
        .on('change', function(event) {
            console.log(event.path + "------js文件发生变化");
        });

    gulp.watch('./webapp/images/*', ['image'])
        .on('change', function(event) {

            console.log(event.path + "------图片文件发生变化");
        });

    gulp.watch(['./webapp/css/**/*', './webapp/js/**/*', './webapp/images/**/*'])
        .on('change', function(event) {
            gulp.start('reload');
        });


})


gulp.task('html', function() {
    var htmlFilter = filter(['**', '!webapp/lib/**']);

    return gulp.src([
            './webapp/**/*.html',
        ])
        .pipe(htmlFilter)
        .pipe(gulp.dest('./public'))
        .pipe(notify({ message: "html文件完成" }));
});



gulp.task('image', function() {
    return gulp.src([
            './webapp/images/*',
        ], { base: './webapp/images/' })
        .pipe(gulp.dest('./public/images'))
        .pipe(notify({ message: "图片目录更新完成" }));
});


gulp.task('css', ['sass'], function() {
    return gulp.src([
            './webapp/css/**/*.css',
        ], { base: './webapp/css/' })
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(cssmin())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./public/css'))
        .pipe(notify({ message: "css压缩完成" }));
});

gulp.task('js', ['jshint'], function() {
    return gulp.src(['./webapp/js/**/*.js'], { base: './webapp/js/' })
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({ message: "js压缩完成" }));
});



gulp.task('sass', function() {
    return sass('./webapp/Sass/**/*.scss', { sourcemap: false }, { style: 'expanded' })
        .on('error', sass.logError)
        .pipe(prefix())
        // .pipe(sourcemaps.write('maps', {
        //     includeContent: false,
        //     sourceRoot: 'source'
        // }))
        .pipe(gulp.dest('./webapp/css/Sass-temp'))
        .pipe(notify({ message: "Sass compile Success!!!" }));

});


gulp.task('jshint', function() {
    return gulp.src('./webapp/js/**/*.js')
        .pipe(notify({ message: "jshint检验js代码开始" }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: "jshint检验js代码结束" }));
});



gulp.task('clean', function() {
    return gulp.src(['./public/dist/css', './public/dist/js', './public/dist/images', './public/dist/lib', './public/**/*.html', './public','./build.zip'], { read: false })
        .pipe(clean({ force: true }))
        .pipe(notify({ message: 'public目录清理完成' }))

});
