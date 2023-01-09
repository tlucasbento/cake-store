const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const { watch, series } = require('gulp');

function html() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
}

function style() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browsersync.stream());
}

function images() {
  return gulp.src('src/assets/*.*')
    .pipe(gulp.dest('dist/assets'))
};

function jquery() {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist/js/vendor/'));
};

function inputMask() {
  return gulp.src('node_modules/jquery.maskedinput/src/jquery.maskedinput.js')
    .pipe(gulp.dest('dist/js/vendor/'));
};

function js() {
  return gulp.src('src/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/js/'));
};

function browserServe(cb){
  browsersync.init({
    server: {
      baseDir: 'dist/'
    }    
  });
  cb();
}

function browserReload(cb){
  browsersync.reload();
  cb();
}

function watchFiles(){
  watch('src/*.html', series(html, browserReload));
  watch(['src/**/*.scss', 'src/**/*.js'], series(style, js, browserReload));
}

exports.default = series(
  html,
  images,
  style,
  jquery,
  inputMask,
  js,
  browserServe,
  watchFiles
);