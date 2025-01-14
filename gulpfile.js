const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();
const jsonminify = require('jsonminify');
const plumber = require('gulp-plumber');
const map = require('gulp-map');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
// const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const path = require('path');
const fileInclude = require('gulp-file-include');
const fs = require('fs');

// File paths
const paths = {
  styles: {
    // src: 'src/scss/**/*.scss',
    src: 'src/scss/style.scss',
    dest: 'dist/css/'
  },
  scripts: {
    // src: 'src/js/**/*.js',
    src: ['src/js/**/*.js', 'src/blocks/**/*.js'],
    dest: 'dist/js/'
  },
  vendors: {
    jquery: 'node_modules/jquery/dist/jquery.min.js',
    jqueryMigrate: 'node_modules/jquery-migrate/dist/jquery-migrate.min.js',
    // swipejs: 'node_modules/swipejs/build/swipe.min.js',
    owl: 'node_modules/owl.carousel//dist/owl.carousel.min.js',
    owlStyle: 'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  }
};

// Clean task: remove previous build
gulp.task('clean', () => {
  return del(['dist/*']);
});

// Styles task: compile Sass and minify CSS
// gulp.task('styles', () => {
//     console.log('Starting styles task...mazafaka');
//   return gulp.src(paths.styles.src)
//     .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer())
//     .pipe(cleanCSS())
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest(paths.styles.dest))
//     .pipe(browserSync.stream());
// });


gulp.task('create-css-dir', (done) => {
    const dir = path.join(__dirname, 'dist/css');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log('Created dist/css directory');
    }
    done();
  });

  // Задача для копирования owl.carousel.min.css
gulp.task('copyVendorsStyles', () => {
  return gulp.src(paths.vendors.owlStyle)  // указываем путь к owl.carousel.min.css
    .pipe(gulp.dest('dist/css/'));  // копируем файл в папку dist/css/
});
  
  gulp.task('styles', gulp.series('create-css-dir', 'copyVendorsStyles', () => {
    return gulp.src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browserSync.stream());
  }));

// Scripts task: process JS with Webpack
gulp.task('scripts', () => {
  return gulp.src(paths.scripts.src)
    .pipe(webpackStream({
      mode: 'production',
      output: {
        // filename: 'bundle.min.js'
        filename: 'script.min.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
});

// gulp.task('copyJQuery', () => {
//     return gulp.src(paths.jquery.src)  // Указываем путь к jQuery в node_modules
//       .pipe(gulp.dest(paths.jquery.dest));  // Копируем в папку dist/js
//   });

//   gulp.task('copyJQueryMigrate', () => {
//     return gulp.src(paths.jqueryMigrate.src)  // Указываем путь к jQuery Migrate в node_modules
//       .pipe(gulp.dest(paths.jqueryMigrate.dest));  // Копируем в папку dist/js
//   });  

// Images task: optimize images
gulp.task('images', () => {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
});

// HTML task: copy HTML files to dist folder
// gulp.task('html', () => {
//   return gulp.src(paths.html.src)
//     .pipe(gulp.dest(paths.html.dest));
// });

gulp.task('copyVendors', () => {
    return gulp.src([paths.vendors.jquery, paths.vendors.jqueryMigrate, paths.vendors.owl])  // указываем путь к файлам
      .pipe(gulp.dest(paths.vendors.dest));  // указываем папку назначения
  });

gulp.task('html', () => {
  return gulp.src(paths.html.src)
    .pipe(fileInclude({
      prefix: '@@',        // Указывает на использование @@include
      basepath: '@file'    // Указывает на базовый путь для поиска файлов
    }))
    .pipe(gulp.dest(paths.html.dest))  // Копирование в папку dist
    .pipe(browserSync.stream());  // Автоматическая перезагрузка при изменении HTML
});

// Watch task: watch for changes in files
gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['src/scss/**/*.scss', 'src/blocks/**/*.scss'], gulp.series('styles'));
  gulp.watch(['src/js/**/*.js', 'src/blocks/**/*.js'], gulp.series('scripts'));
  gulp.watch(paths.images.src, gulp.series('images'));
  gulp.watch('src/*.html', gulp.series('html'));
  // gulp.watch(paths.html.src, gulp.series('html'));
//   gulp.watch(paths.jquery.src, gulp.series('copyJQuery'));
//   gulp.watch(paths.jquery.src, gulp.series('copyJQueryMigrate')); //copyJQueryMigrate
});

 // Task for watching files for live changes
 gulp.task('liveWatch', () => {
    // gulp.watch('src/**/*.html', gulp.series('html', browserSync.reload));
    gulp.watch('src/**/*.html', gulp.series('html', 'reloadHtml'));
    gulp.watch('src/js/**/*.js', gulp.series('scripts', 'reloadJS'));
    gulp.watch(['src/scss/**/*.scss', 'src/blocks/**/*.scss'], gulp.series('styles'));
  });

// Default task: run all tasks
gulp.task('default', gulp.series('clean', gulp.parallel('styles', 'scripts', 'images', 'html'), 'watch'));
// Task for advanced error logging
gulp.task('errorHandling', () => {
    gulp.src('src/scss/**/*.scss')
      .pipe(sass().on('error', (err) => {
        console.error('SASS Error:', err.message);
        this.emit('end');
      }))
      .pipe(gulp.dest('dist/css'));
  });
  
  // Gulp task for copying fonts into dist folder
  gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));
  });
  
  // Task to build vendor libraries, like jQuery, if needed
  gulp.task('vendorLibs', () => {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('dist/js/libs'));
  });

  gulp.task('processJSON', () => {
    return gulp.src('src/json/**/*.json')
      .pipe(plumber())
      .pipe(map((file, cb) => {
        if (file.contents) {
          file.contents = Buffer.from(jsonminify(file.contents.toString()));
        }
        cb(null, file);
      }))
      .pipe(gulp.dest('dist/json'));
  });
  
  // Adding a task to watch for changes in HTML files for live reload
  gulp.task('watchHtml', () => {
    gulp.watch('src/**/*.html', gulp.series('html'));
  });
  
  // Task for generating browser-sync compatible environment
  gulp.task('browserSync', () => {
    browserSync.init({
      server: {
        baseDir: 'dist'
      },
      port: 3000,
      open: true,  // Open the browser when starting
      notify: false // Disable notifications on the page
    });
  });
  
  // Cache control for static assets
  gulp.task('cacheBusting', () => {
    return gulp.src('dist/*.html')
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
  });
  
  // Task to minimize HTML for production
  gulp.task('minifyHtml', () => {
    const htmlmin = require('gulp-htmlmin');
    return gulp.src('dist/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));
  });
  
  // Task to handle SVG files and optimize them
  gulp.task('optimizeSvg', () => {
    const svgmin = require('gulp-svgmin');
    return gulp.src('src/img/**/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest('dist/img'));
  });
// Task to clean the distribution folder
gulp.task('cleanDist', () => {
    return del(['dist/*']);
  });
  
  // Task to handle TypeScript files if your project has .ts files
  gulp.task('typescript', () => {
    const ts = require('gulp-typescript');
    const tsProject = ts.createProject('tsconfig.json');
    
    return gulp.src('src/ts/**/*.ts')
      .pipe(tsProject())
      .pipe(gulp.dest('dist/js'));
  });
  
  // Task for hot reload (live-reload) for JavaScript changes
  gulp.task('reloadJS', () => {
    browserSync.reload('dist/js/*.js');
  });

  gulp.task('reloadHtml', () => {
    browserSync.reload('dist/*.html');
  });
  
   
  // Task for handling server errors and preventing server shutdown
  gulp.task('errorPrevent', () => {
    gulp.src('src/js/**/*.js')
      .pipe(gulp.dest('dist/js'))
      .on('error', (err) => {
        console.error('Error occurred:', err.message);
      });
  });
  
  // Task for serving the project from a specific directory
  gulp.task('serveDist', () => {
    browserSync.init({
      server: 'dist',
      port: 8080,
      open: false
    });
  });
// Task to watch and optimize SVG files for better performance
gulp.task('optimizeSvgFiles', () => {
    const svgmin = require('gulp-svgmin');
    return gulp.src('src/img/**/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest('dist/img'));
  });
  
  // Minify CSS task for optimized production code
  gulp.task('minifyCss', () => {
    return gulp.src('dist/css/**/*.css')
      .pipe(cleanCSS({ level: 2 }))
      .pipe(gulp.dest('dist/css'));
  });
  
  // Add server-side rendering if your project requires it
  gulp.task('serverSideRendering', () => {
    const render = require('some-rendering-library');
    return gulp.src('src/templates/**/*.html')
      .pipe(render())
      .pipe(gulp.dest('dist/templates'));
  });
  gulp.task('deploy', function() {
    var ghPages = require('gulp-gh-pages');
    console.log('---------- Публикация содержимого ./build/ на GH pages');
    return gulp.src(dirs.buildPath + '**/*')
      .pipe(ghPages());
  });
  
  // Final deploy task: copy everything to the remote server
//   gulp.task('finalDeploy', gulp.series('deploy', 'cleanupOldFiles', 'minifyHtml', 'minifyCss', 'optimizeSvgFiles', 'fonts', 'serveDist'));
  
  // Trigger build tasks
//   gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'scripts', 'images', 'html', 'fonts', 'processJSON'), 'minifyHtml', 'finalDeploy'));
gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'scripts', 'images', 'html', 'copyVendors', 'fonts', 'processJSON'), 'minifyHtml'));
  
  // Run the build task and watch for changes
  gulp.task('default', gulp.series('build', 'watch'));
      