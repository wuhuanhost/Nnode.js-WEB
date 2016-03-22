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
var obfuscate	=	require('gulp-obfuscate');


gulp.task('image', ['sass', 'jshint'], function() {
    return gulp.src([
        './public/images',
    ], { base: './public' })
        .pipe(gulp.dest('./public/dist'))
        .pipe(notify({ message: "图片目录更新完成" }));
});


gulp.task('css', ['sass', 'jshint'], function() {
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


gulp.task('lib', function() {
    gulp.src([
        './lib/jquery/dist/jquery.min.js',
        './lib/bootstrap/dist/css/bootstrap.min.css',
        './lib/bootstrap/dist/js/bootstrap.min.js',
        './lib/bootstrap/dist/fonts/*',
        './lib/angular/angular.min.js'
    ], { base: './lib' })
        .pipe(gulp.dest('./public/dist/lib'));
});


gulp.task('sass', function() {
    return sass('./sass/**/*.scss', { sourcemap: true }, { style: 'expanded' })
        .on('error', sass.logError)
        .pipe(prefix())
        // .pipe(sourcemaps.write('maps', {
        //     includeContent: false,
        //     sourceRoot: 'source'
        // }))
        .pipe(gulp.dest('./public/css/'))
        .pipe(notify({ message: "Sass compile Success!!!" }));

});


gulp.task('jshint', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(notify({ message: "jshint检验js代码开始" }))
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(notify({ message: "jshint检验js代码结束" }));
});


gulp.task('clean', function() {
    return gulp.src(['./public/dist/css', './public/dist/js', './public/dist/images','./public/dist/lib'], { read: false })
        .pipe(clean({ force: true }))
        .pipe(notify({ message: 'dist目录清理完成' }))

});


gulp.task('watch', function() {
  
    gulp.watch('./sass/**/*.scss', ['css'])
        .on('change', function(event) {
            console.log(event.path + "------------------");
        });
 
    gulp.watch('./public/**/*.js', ['js'])
        .on('change', function(event) {
            console.log(event.path + "------------------");
        });

    gulp.watch('./public/images/**', ['image'])
        .on('change', function(event) {
            console.log(event.path + "------------------");
        });
})



//默认任务
gulp.task('default', ['clean'], function() {
    
    gulp.start('lib','css','js','image', 'watch');

});



