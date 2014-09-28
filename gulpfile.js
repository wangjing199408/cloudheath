var gulp = require('gulp');
var rename = require('gulp-rename');
var loopbackAngular = require('gulp-loopback-sdk-angular');

gulp.task('default', function () {
  return gulp.src('./server/server.js')
    .pipe(loopbackAngular({apiUrl:'http://42.121.124.27:3000/api'}))
    .pipe(rename('cloudheath.js'))
    .pipe(gulp.dest('./bower-cloudheath/'));
});