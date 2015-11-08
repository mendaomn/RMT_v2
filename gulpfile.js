// Load plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concatcss = require('gulp-concat-css'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch');

// Styles
gulp.task('styles', function() {
    return gulp.src('css/**/*.css')
        .pipe(concatcss('styles.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        // .pipe(notify({
        //     message: 'Styles task complete'
        // }));
});

// Scripts
gulp.task('scripts', ['lint'], function() {
    return gulp.src('js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        // .pipe(notify({
        //     message: 'Scripts task complete'
        // }));
});

// JSHint
gulp.task('lint', function() {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('css/**/*.css', ['styles']);
    gulp.watch('js/**/*.js', ['scripts']);
});

// Server
gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});

// Live Reload
gulp.task('livereload', function() {
    gulp.src(['pages/**/*.html', 'index.html', 'css/**/*.css', 'js/**/*.js'])
        .pipe(watch(['pages/**/*.html', 'index.html', 'css/**/*.css', 'js/**/*.js']))
        .pipe(connect.reload());
});

// Default task
gulp.task('default', ['webserver', 'livereload'], function() {
    gulp.start('styles', 'scripts', 'watch');
});