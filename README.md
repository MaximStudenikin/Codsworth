# Codsworth

##Установка

Если вы мало знакомы с git Первый пункт копируйте и вставляйте целиком!
    
    1. git clone https://github.com/MaximStudenikin/Codsworth.git -b v1.0.0
    
    Через терминал
    
    2. npm i


###В этой версии

Возможности
- компиляция sass
- компиляция pug (jedi)
- сжатие js
- browserSync (livereload, ghostMode)

Пути
--
    build: './build/',       //Готовый продукт
    dev: './dev/'           //Все наше сокровище

Зависиммости
--
"devDependencies": {

    "browser-sync": "^2.18.13",
    "del": "^3.0.0",
    "gulp": "github:gulpjs/gulp#4.0",
    "gulp-autoprefixer": "^4.0.0",
    "gulp-cleancss": "^0.2.2",
    "gulp-concat": "^2.6.1",
    "gulp-group-css-media-queries": "^1.2.0",
    "gulp-pug": "^3.3.0",
    "gulp-rename": "^1.2.2",
    "gulp-replace": "^0.6.1",
    "gulp-sass": "^3.1.0",
    "gulp-sass-glob": "^1.0.8",
    "gulp-sourcemaps": "^2.6.1",
    "gulp-uglify": "^3.0.0"

  }
  
  "dependencies": {
  
    "jquery": "^3.2.1"

}

browserSync настройки
---
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
 
 Запуск
 --
 gulp.task('default', gulp.series(
 
     remov,
     gulp.parallel(style, script, html),
     gulp.parallel(watch, serve)
 ));
