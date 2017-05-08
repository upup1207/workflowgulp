const gulp = require('gulp');
    uglify = require('gulp-uglify');
    sass = require('gulp-sass');
    concat = require('gulp-concat');
    autoprefixer = require('gulp-autoprefixer');
    sourcemaps = require('gulp-sourcemaps');
    browserSync = require('browser-sync').create();
    reload = browserSync.reload;
    pug = require('gulp-pug');
gulp.task('pug',() =>
    gulp.src('src/*.pug')
    .pipe(pug({
        pretty:true
    }))
    .on('error', console.error.bind(console))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./public'))
);
gulp.task('sass', function(){
    css_mapping = ['src/css/main.scss'];
    gulp.src(css_mapping)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
        cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./public",
            index: "index.html"
        }
    });
    gulp.watch("./public/**/*.*").on("change", reload);
});
gulp.task('script', function(){
    gulp.src([
    'src/js/particle.min.js'] )
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));

    gulp.src('src/js/main.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
});
gulp.task('default',['sass','server'],function() {
    gulp.watch('src/js/**/*.js',['script']);
    gulp.watch('src/index.pug',['pug']);
    gulp.watch(['src/css/**/*.scss'], ['sass']);
});