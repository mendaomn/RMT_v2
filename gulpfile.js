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
    templates = require('gulp-angular-templatecache'),
    minifyHTML = require('gulp-minify-html'),
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

// Templates
gulp.task('templates', function() {
    gulp.src([
            'templates/**/*.html',
            'pages/**/*.html'
        ])
        .pipe(minifyHTML({
            quotes: true
        }))
        .pipe(templates('templates.js', {
            standalone: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
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
    gulp.watch([
        'templates/**/*.html',
        'pages/**/*.html'
    ], ['templates']);
});

// Server
gulp.task('webserver', function() {
    connect.server({
        port: 7070,
        livereload: true
    });
});

// Live Reload
gulp.task('livereload', function() {
    gulp.src(['dist/**/*'])
        .pipe(watch(['dist/**/*']))
        .pipe(connect.reload());
});

// Default task
gulp.task('default', ['webserver', 'livereload'], function() {
    gulp.start('styles', 'scripts', 'templates', 'watch');
});