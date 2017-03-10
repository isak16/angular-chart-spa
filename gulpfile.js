/**
 * Created by isak16 on 2017-03-10.
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('default', function () {
   gulp.src(["js/*.js", "js/il-ng-files/*.js"])
       .pipe(ngAnnotate())
       .pipe(uglify())
       .pipe(gulp.dest('minjs'));
});