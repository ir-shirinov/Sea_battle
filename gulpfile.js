"use strict";

var autoprefixer = require("autoprefixer");
var plumber = require("gulp-plumber");
var htmlmin = require('gulp-htmlmin');
var browserSync = require("browser-sync").create();
var sourcemaps = require('gulp-sourcemaps');
var rollup = require("gulp-rollup");
var babel = require('gulp-babel');
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var csso = require("gulp-csso");
var del = require("del");
var run = require("run-sequence");
var gulp = require("gulp");



var path = {
  build: {
      html: './build/',
      js: './build/js/',
      css: './build/css/'
  },
  src: {
      html: './index.html', 
      js: './js/**/*.js',
      mainjs: './js/main.js',
      style: './sass/style.scss',
      fonts: './fonts/**/*.*'
  },
  watch: { 
      html: './index.html',
      js: 'js/**/*.js',
      style: "./sass/**/*.{scss,sass}"
  },
  site: "./build"
};

gulp.task("html", function(){
  return gulp.src(path.src.html)
  	.pipe(plumber())
    .pipe(htmlmin({removeComments: true, collapseWhitespace: true}))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
})

gulp.task("js", function(){
  return gulp.src(path.src.js)
  	.pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(rollup({
    	input: path.src.mainjs,
      output: {
        format: 'iife'
      }
    }))
    //.pipe(babel({
    //    presets: ['@babel/env']
    //  }))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
})

gulp.task("style", function() {
  gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
});

gulp.task("copy", function(){
  return gulp.src([
    path.src.fonts
  ], {
    base: "."
  })
  .pipe(gulp.dest(path.site));
})

gulp.task("clean", function(){
  return del(path.site);
})

gulp.task("server", function() {
  browserSync.init({
    server: path.site,
    index: 'index.html',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    browser: "firefox",
    tunnel: true //тунель для теста сайта
  });

  gulp.watch(path.watch.style, ["style"]);
  gulp.watch(path.watch.html, ["html"]);
  gulp.watch(path.watch.js, ["js"]);
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "js",
    "style",
    "html",
    done
  );
});
