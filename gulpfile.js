
var gulp = require('gulp');
var rename = require('gulp-rename');
var basswork = require('gulp-basswork');
var minifyCss = require('gulp-minify-css');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('css', function() {
  gulp.src('./src/css/base.css')
    .pipe(basswork())
    .pipe(gulp.dest('./css'))
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./css'));
});

gulp.task('js', function() {
  gulp.src('./src/js/app.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./js'));
});

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({}));
});

gulp.task('default', ['css', 'js', 'serve'], function() {
  gulp.watch(['./src/**/*'], ['css', 'js']);
});


// Alternative Sass support
// Use this instead of the css task when using Sass
gulp.task('sass', function() {
  gulp.src('./src/scss/base.scss')
    .pipe(sass({
      includePaths: ['./node_modules']
    }))
    .pipe(gulp.dest('./css'))
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./css'));
});

