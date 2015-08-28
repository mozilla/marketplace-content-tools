import fs from 'fs';
import path from 'path';

import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import connectFallback from 'connect-history-api-fallback';
import envify from 'envify/custom';
import exorcist from 'exorcist';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import imgUrlCachebust from 'gulp-css-img-cachebust';
import minifyCss from 'gulp-minify-css';
import nib from 'nib';
import reactify from 'reactify';
import stylus from 'gulp-stylus';
import uglifyify from 'uglifyify';
import vinylBuffer from 'vinyl-buffer';
import vinylSource from 'vinyl-source-stream';
import watchify from 'watchify';


const ROOT = './src/media';
const JS = path.resolve(ROOT, 'js');
const CSS = path.resolve(ROOT, 'css');

const ENVS = {
  'altdev': {
    apiRoot: 'https://marketplace-altdev.allizom.org/api/v2/',
    mediaRoot: 'https://marketplace-altdev-cdn.allizom.org/media/',
  },
  dev: {
    apiRoot: 'https://marketplace-dev.allizom.org/api/v2/',
    mediaRoot: 'https://marketplace-dev.mozflare.net/media/',
  },
  local: {
    apiRoot: 'http://localhost:2600/api/v2/',
    mediaRoot: 'https://marketplace-dev.mozflare.net/media/',
  },
  stage: {
    apiRoot: 'https://marketplace.allizom.org/api/v2/',
    mediaRoot: 'https://marketplace-stage.cdn.mozilla.net/media/',
  },
  prod: {
    apiRoot: 'https://marketplace.firefox.com/api/v2/',
    mediaRoot: 'https://marketplace.cdn.mozilla.net/media/',
  },
};

watchify.args.debug = true;
let bundler = browserify(path.resolve(JS, 'app.js'), watchify.args)
  .transform(babelify.configure({
    optional: ['runtime'],
    stage: 0
  }))
  .transform(envify({
    NODE_ENV: process.env.NODE_ENV || '',
    MKT_API_ROOT: ENVS[process.env.MKT_ENV || 'dev'].apiRoot,
    MKT_MEDIA_ROOT: ENVS[process.env.MKT_ENV || 'dev'].mediaRoot
  }))
  .transform(reactify);
if (process.env.NODE_ENV === 'production' && process.env.MKT_ENV !== 'dev') {
  // Uglify.
  bundler = bundler.transform({
    global: true
  }, 'uglifyify');
}


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


function jsBundle(bundler) {
  return bundler
    .bundle()
    .on('error', err => {
      console.log(err.message);
      console.log(err.codeFrame);
      this.emit('end');
    })
    .pipe(exorcist(path.join(JS, 'bundle.js.map'), 'bundle.js.map', JS, JS))
    .pipe(fs.createWriteStream(path.join(JS, 'bundle.js'), 'utf8'));
}


gulp.task('js', () => {
  return jsBundle(bundler);
});


gulp.task('serve', () => {
  browserSync.init({
    index: 'src/index.html',
    middleware: [connectFallback()],
    notify: false,
    open: false,
    server: './src/',
    port: process.env.MKT_CLIENT_PORT || 8679
  });
});


gulp.task('watch', () => {
  const watchifyBundler = watchify(bundler);

  watchifyBundler.on('update', () => {
    jsBundle(bundler);
  });
  watchifyBundler.on('log', console.log);

  gulp.watch(path.resolve(CSS, '**/*.styl'), ['css']);
});


gulp.task('build', ['css', 'js']);
gulp.task('default', ['css', 'js', 'serve', 'watch']);
