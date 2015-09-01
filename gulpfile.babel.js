import path from 'path';

import browserSync from 'browser-sync';
import connectFallback from 'connect-history-api-fallback';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import imgUrlCachebust from 'gulp-css-img-cachebust';
import minifyCss from 'gulp-minify-css';
import nib from 'nib';
import stylus from 'gulp-stylus';


const ROOT = './src/media';
const CSS = path.resolve(ROOT, 'css');


gulp.task('css', () => {
  gulp.src([path.resolve(CSS, '**/*.styl'),
        path.resolve(CSS, 'lib/*.css')])
    .pipe(stylus({compress: true, use: [nib()]}))
    .pipe(autoprefixer())
    .pipe(concat('bundle.css'))
    .pipe(minifyCss())
    .pipe(gulpIf(process.env.NODE_ENV === 'production', imgUrlCachebust()))
    .pipe(gulp.dest(CSS))
    .pipe(browserSync.stream());
});


gulp.task('watch', () => {
  gulp.watch(path.resolve(CSS, '**/*.styl'), ['css']);

  browserSync.init({
    index: 'src/index.html',
    middleware: [connectFallback()],
    notify: false,
    open: false,
    port: process.env.MKT_CLIENT_PORT || 8679,
    server: './src',
  });
});


gulp.task('build', ['css']);
gulp.task('default', ['css', 'watch']);
