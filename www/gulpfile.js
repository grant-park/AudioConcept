'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.task('sass', function(){
    return gulp.src('sass/**/*.scss')
    .pipe(livereload())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function(){
    livereload.listen();
    gulp.watch('sass/**/*.scss', ['sass']);
});
