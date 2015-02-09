 var gulp = require('gulp'),
  	 connect = require('gulp-connect'),
  	 opn = require('opn'),
  	 gulpif = require('gulp-if'),
  	 useref = require('gulp-useref'),
  	 uglify = require('gulp-uglify'),
     wiredep = require('wiredep').stream,
  	 minifyCSS = require('gulp-minify-css');


// RUN CONNECT LOCAL SERVER
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
  opn('http://localhost:8080/');
});

// html Livereaload
gulp.task('html', function () {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});
 
 // css livereload
gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});

//Bower link
 gulp.task('bower', function () {
     gulp.src('app/*.html')
         .pipe(wiredep({
             directory: 'app/_bower',
             optional: 'configuration',
             goes: 'here'
         }))
         .pipe(gulp.dest('dist'));
 });

// watch 
gulp.task('watch', function () {
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch(['./app/css/*.css'], ['css']);
});

// Building project [Distribution]
gulp.task('dist', function () {
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['connect', 'watch']);
