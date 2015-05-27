var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var del = require('del');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');

var ROOT = __dirname + '/build/';

gulp.task('css', function () {
    var dest = ROOT + 'css/';
    del(dest + '**/*.css');
    gulp.src('src/css/index.styl')
        .pipe(stylus({ compress: true }))
        .pipe(gulp.dest(dest));
});

gulp.task('js', function () {
    var dest = ROOT + 'js/';
    del(dest + '**/*.js');
    gulp.src(['src/js/index.js'])
        .pipe(browserify({
            debug: true,
            transform: [ 'reactify' ]
        }))
        .pipe(gulp.dest(dest));
});
 
gulp.task('html', function(){
    del(ROOT + '**/*.html');
    gulp.src('src/*.html')
        .pipe(gulp.dest(ROOT));
});

gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', [ 'js' ]);
    gulp.watch('src/css/**/*.styl', [ 'css' ]);
    gulp.watch('src/*.html', [ 'html' ]);
});

gulp.task('server', function() {
    connect.server({
        livereload: false,
        port: 8000,
        root: [ ROOT ]
    });
});

gulp.task('build', [ 'css', 'js', 'html' ]);
gulp.task('default', [ 'build', 'server', 'watch']);
