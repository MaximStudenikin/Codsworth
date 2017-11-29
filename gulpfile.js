'use strict';

const gulp = require('gulp');

//serv
const browSync = require('browser-sync').create();

//var sass
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const groupMediaCSSQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');

const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

//paths
const paths = {
    build: './build/',       //Готовый продукт
    dev: './dev/'           //Все наше сокровище
};


//sass
gulp.task ('sass', function() {
    return gulp.src(paths.dev + 'sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(groupMediaCSSQueries())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.build + 'css/'))
});

function style()  {
    return gulp.src(paths.dev + 'sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(groupMediaCSSQueries())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.build + 'css/'))
}

exports.style = style;

gulp.task('build', gulp.series(
    style
));