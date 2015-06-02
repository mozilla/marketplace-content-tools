var path = require('path');

var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var reactify = require('reactify');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var vinylBuffer = require('vinyl-buffer');
var vinylSource = require('vinyl-source-stream');
var watchify = require('watchify');
var webserver = require('gulp-webserver');


var ROOT = './src/';
var JS = path.resolve(ROOT, 'js');
var CSS = path.resolve(ROOT, 'css');

var bundler = browserify(path.resolve(JS, 'app.js'), watchify.args)
    .transform(babelify)
    .transform(reactify);


gulp.task('css', function() {
    gulp.src([path.resolve(CSS, '*.styl'), path.resolve(CSS, 'lib/*.css')])
        .pipe(stylus({compress: true}))
        .pipe(autoprefixer())
        .pipe(concat('bundle.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('build'));
});


function jsBundle(bundler) {
    var bundle = bundler
        .bundle()
        .pipe(vinylSource('bundle.js'))
        .pipe(vinylBuffer());

    if (process.env.NODE_ENV == 'production') {
        bundle = bundle.pipe(uglify());
    }

    return bundle.pipe(gulp.dest('build'));
}


gulp.task('js', function() {
    return jsBundle(bundler);
});


gulp.task('serve', function() {
    return gulp.src(['./'])
        .pipe(webserver({
            fallback: 'index.html',
            port: process.env.SUBMISSION_CLIENT_PORT || '8680'
        }));
});

gulp.task('watch', function() {
    bundler = watchify(bundler);

    bundler.on('update', function() {
        jsBundle(bundler);
    });
    bundler.on('log', console.log);

    gulp.watch(path.resolve(CSS, '**/*.styl'), ['css']);
});


gulp.task('build', ['css', 'js']);
gulp.task('default', ['css', 'js', 'serve', 'watch']);
