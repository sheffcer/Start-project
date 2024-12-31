'use strict';

// Подключим зависимости
var fs = require('fs');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var browserSync = require('browser-sync').create();

var postcss = require('gulp-postcss');
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var atImport = require("postcss-import");
var cleanss = require('gulp-cleancss');
var inlineSVG = require('postcss-inline-svg');

var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var gulpIf = require('gulp-if');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var size = require('gulp-size');
var del = require('del');
var newer = require('gulp-newer');

// Получим настройки проекта из projectConfig.json
var projectConfig = require('./projectConfig.json');
var dirs = projectConfig.dirs;
var lists = getFilesList(projectConfig);
// console.log(lists);

// Запишем стилевой файл диспетчер подключений
var styleImports = '/*!*\n * ВНИМАНИЕ! Этот файл генерируется автоматически.\n * Не пишите сюда ничего вручную, все такие правки будут потеряны.\n * Читайте ./README.md для понимания.\n */\n\n';
lists.css.forEach(function(blockPath) {
  styleImports += '@import \''+blockPath+'\';\n';
});
fs.writeFileSync(dirs.srcPath + 'scss/style.scss', styleImports);

// Определим разработка это или финальная сборка
// Запуск `NODE_ENV=production npm start [задача]` приведет к сборке без sourcemaps
var isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

// Плагины postCSS, которыми обрабатываются все стилевые файлы
var postCssPlugins = [
  autoprefixer({browsers: ['last 2 version']}),
  mqpacker({
    sort: true
  }),
  atImport(),
  inlineSVG()
];

// Очистка папки сборки
gulp.task('clean', function () {
  console.log('---------- Очистка папки сборки');
  return del([
    dirs.buildPath + '/**/*',
    '!' + dirs.buildPath + '/readme.md'
  ]);
});

// Компиляция стилей блоков проекта (и  добавочных)
gulp.task('style', function () {
  var sass = require('gulp-sass');
  var sourcemaps = require('gulp-sourcemaps');
  var wait = require('gulp-wait');
  console.log('---------- Компиляция стилей');
  return gulp.src(dirs.srcPath + 'scss/style.scss')
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: 'Styles compilation error',
          message: err.message
        })(err);
        this.emit('end');
      }
    }))
    .pipe(wait(100))
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(debug({title: "Style:"}))
    .pipe(sass())
    .pipe(postcss(postCssPlugins))
    .pipe(gulpIf(!isDev, cleanss()))
    .pipe(rename('style.min.css'))
    .pipe(gulpIf(isDev, sourcemaps.write('/')))
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest(dirs.buildPath + '/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// Компиляция отдельных файлов
gulp.task('style:single', function () {
  if(projectConfig.singleCompiled.length) {
    var sass = require('gulp-sass');
    var sourcemaps = require('gulp-sourcemaps');
    var wait = require('gulp-wait');
    console.log('---------- Компиляция добавочных стилей');
    return gulp.src(projectConfig.singleCompiled)
      .pipe(plumber({
        errorHandler: function(err) {
          notify.onError({
            title: 'Single style compilation error',
            message: err.message
          })(err);
          this.emit('end');
        }
      }))
      .pipe(wait(100))
      .pipe(gulpIf(isDev, sourcemaps.init()))
      .pipe(debug({title: "Single style:"}))
      .pipe(sass())
      .pipe(postcss(postCssPlugins))
      .pipe(gulpIf(!isDev, cleanss()))
      .pipe(gulpIf(isDev, sourcemaps.write('/')))
      .pipe(size({
        title: 'Размер',
        showFiles: true,
        showTotal: false,
      }))
      .pipe(gulp.dest(dirs.buildPath + '/css'))
      .pipe(browserSync.stream({match: '**/*.css'}));
  }
});

// Копирование добавочных CSS, которые хочется иметь отдельными файлами
gulp.task('copy:css', function(callback) {
  if(projectConfig.copiedCss.length) {
    return gulp.src(projectConfig.copiedCss)
      .pipe(postcss(postCssPlugins))
      .pipe(cleanss())
      .pipe(size({
        title: 'Размер',
        showFiles: true,
        showTotal: false,
      }))
      .pipe(gulp.dest(dirs.buildPath + '/css'))
      .pipe(browserSync.stream());
  }
  else {
    callback();
  }
});

// Копирование изображений
gulp.task('copy:img', function () {
  console.log('---------- Копирование изображений');
  return gulp.src(lists.img)
    .pipe(newer(dirs.buildPath + '/img'))  // оставить в потоке только изменившиеся файлы
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest(dirs.buildPath + '/img'));
});

// Копирование JS
gulp.task('copy:js', function (callback) {
  if(projectConfig.copiedJs.length) {
    return gulp.src(projectConfig.copiedJs)
      .pipe(size({
        title: 'Размер',
        showFiles: true,
        showTotal: false,
      }))
      .pipe(gulp.dest(dirs.buildPath + '/js'));
  }
  else {
    callback();
  }
});

// Копирование шрифтов
gulp.task('copy:fonts', function () {
  console.log('---------- Копирование шрифтов');
  return gulp.src(dirs.srcPath + '/fonts/*.{ttf,woff,woff2,eot,svg}')
    .pipe(newer(dirs.buildPath + '/fonts'))  // оставить в потоке только изменившиеся файлы
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest(dirs.buildPath + '/fonts'));
});

// Сборка SVG-спрайта для блока sprite-svg
var spriteSvgPath = dirs.srcPath + dirs.blocksDirName + '/sprite-svg/svg/';
gulp.task('sprite:svg', function (callback) {
  if((projectConfig.blocks['sprite-svg']) !== undefined) {
    var svgstore = require('gulp-svgstore');
    var svgmin = require('gulp-svgmin');
    var cheerio = require('gulp-cheerio');
    if(fileExist(spriteSvgPath) !== false) {
      console.log('---------- Сборка SVG спрайта');
      return gulp.src(spriteSvgPath + '*.svg')
        .pipe(svgmin(function (file) {
          return {
            plugins: [{
              cleanupIDs: {
                minify: true
              }
            }]
          }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(cheerio({
          run: function($) {
            $('svg').attr('style',  'display:none');
          },
          parserOptions: {
            xmlMode: true
          }
        }))
        .pipe(rename('sprite-svg.svg'))
        .pipe(size({
          title: 'Размер',
          showFiles: true,
          showTotal: false,
        }))
        .pipe(gulp.dest(dirs.srcPath + dirs.blocksDirName + '/sprite-svg/img/'));
    }
    else {
      console.log('---------- Сборка SVG спрайта: ОТМЕНА, нет папки с картинками');
      callback();
    }
  }
  else {
    console.log('---------- Сборка SVG спрайта: ОТМЕНА, блок не используется на проекте');
    callback();
  }
});

// Сборка SVG-спрайта для блока sprite-png
var spritePngPath = dirs.srcPath + dirs.blocksDirName + '/sprite-png/png/';
gulp.task('sprite:png', function (callback) {
  if((projectConfig.blocks['sprite-png']) !== undefined) {
    var spritesmith = require('gulp.spritesmith');
    var buffer = require('vinyl-buffer');
    var merge = require('merge-stream');
    var imagemin = require('gulp-imagemin');
    var pngquant = require('imagemin-pngquant');
    if(fileExist(spritePngPath) !== false) {
      del(dirs.srcPath + dirs.blocksDirName + '/sprite-png/img/*.png');
      var fileName = 'sprite-' + Math.random().toString().replace(/[^0-9]/g, '') + '.png';
      var spriteData = gulp.src(spritePngPath + '*.png')
        .pipe(spritesmith({
          imgName: fileName,
          cssName: 'sprite-png.scss',
          padding: 4,
          imgPath: '../img/' + fileName
        }));
      var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin({
          use: [pngquant()]
        }))
        .pipe(gulp.dest(dirs.srcPath + dirs.blocksDirName + '/sprite-png/img/'));
      var cssStream = spriteData.css
        .pipe(gulp.dest(dirs.srcPath + dirs.blocksDirName + '/sprite-png/'));
      return merge(imgStream, cssStream);
    }
    else {
      console.log('---------- Сборка PNG спрайта: ОТМЕНА, нет папки с картинками');
      callback();
    }
  }
  else {
    console.log('---------- Сборка PNG спрайта: ОТМЕНА, блок не используется на проекте');
    callback();
  }
});

// Сборка HTML
gulp.task('html', function() {
  var fileinclude = require('gulp-file-include');
  var replace = require('gulp-replace');
  console.log('---------- сборка HTML');
  return gulp.src(dirs.srcPath + '/*.html')
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: 'HTML compilation error',
          message: err.message
        })(err);
        this.emit('end');
      }
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true,
    }))
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(gulp.dest(dirs.buildPath));
});

// Конкатенация и углификация Javascript
gulp.task('js', function (callback) {
  var uglify = require('gulp-uglify');
  var concat = require('gulp-concat');
  if(lists.js.length > 0){
    console.log('---------- Обработка JS');
    return gulp.src(lists.js)
      .pipe(plumber({
        errorHandler: function(err) {
          notify.onError({
            title: 'Javascript concat/uglify error',
            message: err.message
          })(err);
          this.emit('end');
        }
      }))
      .pipe(concat('script.min.js'))
      .pipe(gulpIf(!isDev, uglify()))
      .pipe(size({
        title: 'Размер',
        showFiles: true,
        showTotal: false,
      }))
      .pipe(gulp.dest(dirs.buildPath + '/js'));
  }
  else {
    console.log('---------- Обработка JS: в сборке нет JS-файлов');
    callback();
  }
});

// Оптимизация изображений // folder=src/img npm start img:opt
var folder = process.env.folder;
gulp.task('img:opt', function (callback) {
  var imagemin = require('gulp-imagemin');
  var pngquant = require('imagemin-pngquant');
  if(folder){
    console.log('---------- Оптимизация картинок');
    return gulp.src(folder + '/*.{jpg,jpeg,gif,png,svg}')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(folder));
  }
  else {
    console.log('---------- Оптимизация картинок: ошибка (не указана папка)');
    console.log('---------- Пример вызова команды: folder=src/blocks/block-name/img npm start img:opt');
    callback();
  }
});

// Сборка всего
gulp.task('build', function (callback) {
  gulpSequence(
    'clean',
    ['sprite:svg', 'sprite:png'],
    ['style', 'style:single', 'js', 'copy:css', 'copy:img', 'copy:js', 'copy:fonts'],
    'html',
    callback
  );
});

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task('deploy', function() {
  var ghPages = require('gulp-gh-pages');
  console.log('---------- Публикация содержимого ./build/ на GH pages');
  return gulp.src(dirs.buildPath + '**/*')
    .pipe(ghPages());
});

// Задача по умолчанию
gulp.task('default', ['serve']);

// Локальный сервер, слежение
gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: dirs.buildPath,
    startPath: 'index.html',
    open: false,
    port: 8080,
  });
  // Слежение за стилями
  gulp.watch([
    dirs.srcPath + 'scss/style.scss',
    dirs.srcPath + dirs.blocksDirName + '/**/*.scss',
    projectConfig.addCssBefore,
    projectConfig.addCssAfter,
  ], ['style']);
  // Слежение за отдельными стилями
  gulp.watch(projectConfig.singleCompiled, ['style:single',]);
  // Слежение за добавочными стилями
  if(projectConfig.copiedCss.length) {
    gulp.watch(projectConfig.copiedCss, ['copy:css']);
  }
  // Слежение за изображениями
  if(lists.img.length) {
    gulp.watch(lists.img, ['watch:img']);
  }
  // Слежение за добавочными JS
  if(projectConfig.copiedJs.length) {
    gulp.watch(projectConfig.copiedJs, ['watch:copied:js']);
  }
  // Слежение за шрифтами
  gulp.watch('/fonts/*.{ttf,woff,woff2,eot,svg}', {cwd: dirs.srcPath}, ['watch:fonts']);
  // Слежение за html
  gulp.watch([
    '*.html',
    '_include/*.html',
    dirs.blocksDirName + '/**/*.html'
  ], {cwd: dirs.srcPath}, ['watch:html']);
  // Слежение за JS
  if(lists.js.length) {
    gulp.watch(lists.js, ['watch:js']);
  }
  // Слежение за SVG (спрайты)
  if((projectConfig.blocks['sprite-svg']) !== undefined) {
    gulp.watch('*.svg', {cwd: spriteSvgPath}, ['watch:sprite:svg']); // следит за новыми и удаляемыми файлами
  }
  // Слежение за PNG (спрайты)
  if((projectConfig.blocks['sprite-png']) !== undefined) {
    gulp.watch('*.png', {cwd: spritePngPath}, ['watch:sprite:png']); // следит за новыми и удаляемыми файлами
  }
});

// Браузерсинк с 3-м галпом — такой браузерсинк...
gulp.task('watch:img', ['copy:img'], reload);
gulp.task('watch:copied:js', ['copy:js'], reload);
gulp.task('watch:fonts', ['copy:fonts'], reload);
gulp.task('watch:html', ['html'], reload);
gulp.task('watch:js', ['js'], reload);
gulp.task('watch:sprite:svg', ['sprite:svg'], reload);
gulp.task('watch:sprite:png', ['sprite:png'], reload);



/**
 * Вернет объект с обрабатываемыми файлами и папками
 * @param  {object}
 * @return {object}
 */
function getFilesList(config){

  var res = {
    'css': [],
    'js': [],
    'img': [],
  };

  // Style
  for (var blockName in config.blocks) {
    res.css.push(config.dirs.srcPath + config.dirs.blocksDirName + '/' + blockName + '/' + blockName + '.scss');
    if(config.blocks[blockName].length) {
      config.blocks[blockName].forEach(function(elementName) {
        res.css.push(config.dirs.srcPath + config.dirs.blocksDirName + '/' + blockName + '/' + blockName + elementName + '.scss');
      });
    }
  }
  res.css = res.css.concat(config.addCssAfter);
  res.css = config.addCssBefore.concat(res.css);

  // JS
  for (var blockName in config.blocks) {
    res.js.push(config.dirs.srcPath + config.dirs.blocksDirName + '/' + blockName + '/' + blockName + '.js');
    if(config.blocks[blockName].length) {
      config.blocks[blockName].forEach(function(elementName) {
        res.js.push(config.dirs.srcPath + config.dirs.blocksDirName + '/' + blockName + '/' + blockName + elementName + '.js');
      });
    }
  }
  res.js = res.js.concat(config.addJsAfter);
  res.js = config.addJsBefore.concat(res.js);

  // Images
  for (var blockName in config.blocks) {
    res.img.push(config.dirs.srcPath + config.dirs.blocksDirName + '/' + blockName + '/img/*.{jpg,jpeg,gif,png,svg}');
  }
  res.img = config.addImages.concat(res.img);

  return res;
}

/**
 * Проверка существования файла или папки
 * @param  {string} path      Путь до файла или папки]
 * @return {boolean}
 */
function fileExist(path) {
  var fs = require('fs');
  try {
    fs.statSync(path);
  } catch(err) {
    return !(err && err.code === 'ENOENT');
  }
}

// Перезагрузка браузера
function reload (done) {
  browserSync.reload();
  done();
}
