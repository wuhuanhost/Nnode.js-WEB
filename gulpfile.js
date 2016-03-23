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
var exec = require('child_process').exec;



//使用Node.js的子进程调用系统命令
gulp.task('start-server', function() {
    exec('supervisor ./bin/www', function(err) {
        if (err) {
            return err;
        }
    });
});

gulp.task('lib', ['bootstrap', 'jquery', 'moment'], function() {
    gulp.src([
            './lib/angular/angular.min.js',
        ], { base: './lib/angular' })
        .pipe(gulp.dest('./public/dist/lib/angular'));
});


gulp.task('bootstrap', function() {
    gulp.src([
            './lib/bootstrap/dist/css/bootstrap.min.css',
            './lib/bootstrap/dist/js/bootstrap.min.js',
            './lib/bootstrap/dist/fonts/*',
        ], { base: './lib/bootstrap/dist' })
        .pipe(gulp.dest('./public/dist/lib/bootstrap'));
});



gulp.task('jquery', function() {
    gulp.src([
            './lib/jquery/dist/jquery.min.js',
        ], { base: './lib/jquery/dist' })
        .pipe(gulp.dest('./public/dist/lib/jquery'));
});



gulp.task('moment', function() {
    gulp.src([
            './lib/moment/min/moment.min.js',
        ], { base: './lib/moment/min' })
        .pipe(gulp.dest('./public/dist/lib/moment'));
});


gulp.task('default', ['clean'], function() {

    gulp.start('lib', 'css', 'js', 'image', 'watch', 'start-server');


});


gulp.task('reload', function() {
    gulp.src(['./public/css/**/*', './public/js/**/*', './public/images/**/*', './app/views/**/*'])
        .pipe(livereload());

});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./public/Sass/**/*.scss', ['css'])
        .on('change', function(event) {
            console.log(event.path + "------Sass文件发生变化");
        });

    gulp.watch('./public/**/*.js', ['js'])
        .on('change', function(event) {
            console.log(event.path + "------js文件发生变化");
        });

    gulp.watch('./public/images/*', ['image'])
        .on('change', function(event) {

            console.log(event.path + "------图片文件发生变化");
        });

    gulp.watch(['./public/css/**/*', './public/js/**/*', './public/images/**/*', './app/views/**/*'])
        .on('change', function(event) {
            gulp.start('reload');
        });


})



gulp.task('image', function() {
    return gulp.src([
            './public/images/*',
        ], { base: './public' })
        .pipe(gulp.dest('./public/dist'))
        .pipe(notify({ message: "图片目录更新完成" }));
});


gulp.task('css', ['sass'], function() {
    return gulp.src([
            './public/css/**/*.css',
        ], { base: './public' })
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public/dist/css'))
        .pipe(cssmin())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./public/dist/css'))
        .pipe(notify({ message: "css压缩完成" }));
});

gulp.task('js', ['jshint'], function() {
    return gulp.src(['./public/js/**/*.js'], { base: './public' })
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/dist/js'))
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest('./public/dist/js'))
        .pipe(notify({ message: "js压缩完成" }));
});



gulp.task('sass', function() {
    return sass('./public/Sass/**/*.scss', { sourcemap: false }, { style: 'expanded' })
        .on('error', sass.logError)
        .pipe(prefix())
        // .pipe(sourcemaps.write('maps', {
        //     includeContent: false,
        //     sourceRoot: 'source'
        // }))
        .pipe(gulp.dest('./public/css/Sass-temp'))
        .pipe(notify({ message: "Sass compile Success!!!" }));

});


gulp.task('jshint', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(notify({ message: "jshint检验js代码开始" }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: "jshint检验js代码结束" }));
});



gulp.task('clean', function() {
    return gulp.src(['./public/dist/css', './public/dist/js', './public/dist/images', './public/dist/lib'], { read: false })
        .pipe(clean({ force: true }))
        .pipe(notify({ message: 'dist目录清理完成' }))

});
