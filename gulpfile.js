var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "."
    });

    gulp.watch("css/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("css/*.scss")
        .pipe(sass())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefixer({browsers:['last 2 version','ie 10']}))
        .pipe(gulp.dest("css/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);