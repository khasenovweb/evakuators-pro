var gulp = require('gulp');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');
var gulpDeployFtp = require('gulp-deploy-ftp');
var ftp = require('gulp-ftp');


//================Разработка====================//
//less
function less__compile() {
	return gulp.src('app/less/*.less')
		.pipe(less())
		.pipe(prefix({
            browsers: ['>0.1%']
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());;

}

//jade
function jade__compile() {
	return gulp.src('app/jade/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('app'));
}

//Вотчер
function watch() {
	less__compile();
	jade__compile();

	browserSync.init({
        server: {
            baseDir: "app"
        }
    });

	gulp.watch('app/js/*.js').on('change', browserSync.reload);
	//gulp.watch('img/**/*').on('change', browserSync.reload);
	gulp.watch('app/img/**/*',browserSync.reload);
    gulp.watch('app/less/*.less', less__compile);
    gulp.watch('app/jade/**/*.jade', jade__compile).on('change', browserSync.reload);

}
gulp.task('jade',jade__compile);
gulp.task('watch',watch);
//================END Разработка====================//





//=======================Сборка====================//
function html__build() {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('docs'));
}

function js__build() {
	return gulp.src('app/js/*.js')
		.pipe(gulp.dest('docs/js'));
}
function css__build() {
	return gulp.src('app/css/*.css')
		.pipe(gulp.dest('docs/css'));
}
function img__build() {
	return gulp.src('app/img/*.*')
		.pipe(gulp.dest('docs/img'));
}
function fonts__build() {
	return gulp.src('app/fonts/*.*')
		.pipe(gulp.dest('docs/fonts'));
}
function build__func() {
	html__build();
	js__build();
	css__build();
	img__build();
	fonts__build();
}

gulp.task('build', build__func);
//=======================END Сборка======================//


//=======================Деплой=========================//
gulp.task('deploy', function () {
    return gulp.src('docs/**/*.*')
        .pipe(ftp({
            host: 'hasenorf.beget.tech',
            user: 'hasenorf_test',
            pass: '1993habo'
        }))
        // you need to have some kind of stream after gulp-ftp to make sure it's flushed
        // this can be a gulp plugin, gulp.dest, or any kind of stream
        // here we use a passthrough stream
        .pipe(gulp.dest('deploy'));
});
//=======================END Деплой=========================//