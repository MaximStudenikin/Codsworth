'use strict';

const gulp = require('gulp');

//var sass
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const groupMediaCSSQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');
const autoPref = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
//html
const pug = require('gulp-pug');
//img
const image = require('gulp-image');

//fonts
//:(

//js
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
//del
const del = require('del');
//server
const browserSync = require('browser-sync').create();

//paths
const paths = {
    build: './build/',       //Готовый продукт
    dev: './dev/',       //Все наше сокровище
    src: './source/'       //исходники для работы (шрифты, картинки и тд)
};

function html() {
    return gulp.src(paths.dev + 'html/pages/*.pug')
        .pipe(pug({pretty: true}))                  //pretty: true что бы index был читаймым
        // .pipe(rename({basename: "index"}))
        .pipe(gulp.dest(paths.build))
}

function style() {
    return gulp.src(paths.dev + 'sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(groupMediaCSSQueries())
        .pipe(cleanCSS())
        .pipe(autoPref({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.build + 'css/'))
}


// webpack(js)
function scripts() {
    return gulp.src(paths.dev + 'common/**/*.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.build +'common/'));
}

//img
function img() {
    return gulp.src(paths.src + 'images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 10
        }))
        .pipe(rename({suffix: "_min"}))
        .pipe(gulp.dest(paths.build + 'img/'))
}

//fonts
//:(

function remov() {
    return del('build/')
}

//watch
function watch() {
    gulp.watch(paths.dev + 'html/**/*.pug', html);
    gulp.watch(paths.dev + 'sass/**/*.scss', style);
    gulp.watch(paths.src + 'images/*.jpg', img);
    gulp.watch(paths.dev + 'common/**/*.js', scripts);
}


function serve() {

    browserSync.init({
        server: {
            baseDir: paths.build
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        browser: "chrome",
        port: 3000,
        online: false
    });
    browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.html = html;
exports.style = style;
exports.scripts = scripts;
exports.img = img;
// exports.fonts = fonts;
exports.remov = remov;
exports.watch = watch;

gulp.task('build', gulp.series(
    remov,
    html,
    style,
    scripts,
    img
));

gulp.task('default', gulp.series(
    remov,
    gulp.parallel(style, html, img, scripts),
    gulp.parallel(watch, serve)
));