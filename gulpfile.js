const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

sass.compiler = require('node-sass');


gulp.task('server', function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "./build"
    }
  });

  gulp.watch('build/**/*').on('change', browserSync.reload)
});

gulp.task('templates:compile', function buildHTML() {
  return gulp.src('./source/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('styles:compile', function () {
  return gulp.src('./source/styles/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function() {
  return gulp.src([
    'source/js/init.js',
    'source/js/validation.js',
    'source/js/form.js',
    'source/js/navigation.js',
    'source/js/main.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('sprite', function (cb) {
  const spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: 'sprite.scss'
  }));

  spriteData.img.pipe(gulp.dest('./build/images/'));
  spriteData.css.pipe(gulp.dest('./source/styles/global/'));
  cb();
});

gulp.task('clean', function del(cb) {
  return rimraf('./build', cb);
});

gulp.task('copy:fonts', function() {
  return gulp.src('./source/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('copy:images', function() {
  return gulp.src('./source/images/**/*.*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

gulp.task('watch', function() {
  gulp.watch('./source/template/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('./source/styles/**/*.scss', gulp.series('styles:compile'));
  gulp.watch('./source/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'styles:compile', 'js', 'sprite', 'copy'),
  gulp.parallel('watch', 'server')
));
