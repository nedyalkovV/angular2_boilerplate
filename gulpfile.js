var gulp = require('gulp');

/* Routes */
const APP_DEV = 'dev/';
var APP_PROD = 'app/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

/* Config */
var tsProject = typescript.createProject('tsconfig.json');

/* Build CSS */
gulp.task('build-css', function() {
    return gulp.src(`${APP_DEV}styles/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(APP_PROD + 'styles/'));
});

/* Build TS */
gulp.task('build-ts', function() {
    return gulp.src(`${APP_DEV}**/*.ts`)
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(APP_PROD));
});

/* Build HTML */
gulp.task('build-html', function() {
    return gulp.src(`${APP_DEV}templates/**/*.html`)
        .pipe(gulp.dest(APP_PROD + 'templates/'));
});

/* Watch HTML */
gulp.task('watch', function() {
    gulp.watch(`${APP_DEV}**/*.ts`, ['build-ts']);
    gulp.watch(`${APP_DEV}**/*.scss`, ['build-css']);
    gulp.watch(`${APP_DEV}**/*.html`, ['build-html']);
});

gulp.task('default', ['watch', 'build-ts', 'build-css', 'build-html']);