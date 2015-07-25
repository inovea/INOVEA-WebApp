var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('jshint', function () {
    return gulp.src('src/app/**/*.js')
        .pipe(reload({stream: true, once: true}))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('serve', ['jshint'], function () {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });

    gulp.watch("src/**/*.*").on('change', reload);
});

