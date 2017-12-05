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

//html
const pug = require('gulp-pug');

//js
const uglify = require('gulp-uglify');

//del
const del = require('del');

//server
const browserSync = require('browser-sync').create();

//paths
const paths = {
    build: './build/',       //Готовый продукт
    dev: './dev/'           //Все наше сокровище
};

function html() {
    return gulp.src(paths.dev + 'html/*.pug')
        .pipe(pug({pretty: true}))                  //pretty: true что бы index был читаймым
        .pipe(rename({ basename: "index" }))
        .pipe(gulp.dest(paths.build))
}

function style()  {
    return gulp.src(paths.dev + 'sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(groupMediaCSSQueries())
        .pipe(cleanCSS())
        .pipe(autoPref({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.build + 'css/'))
}


//js
// function script() {
//     return gulp.src(paths.dev + 'common/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest(paths.build + 'common/'))
// }

function remov() {
    return del('build/')
}

//watch
function watch() {
    gulp.watch(paths.dev + 'html/*.pug', html);
    gulp.watch(paths.dev + 'sass/*.scss', style);
    // gulp.watch(paths.dev + 'common/*.js', script);
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
        port: 3000,
        online: false
    });
    browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.html = html;
exports.style = style;
// exports.script = script;
exports.remov = remov;
exports.watch = watch;

gulp.task('build', gulp.series(
    remov,
    html,
    style
    // script
));

gulp.task('default', gulp.series(
    remov,
    gulp.parallel(style, html),
    gulp.parallel(watch, serve)
));