var browserSync  = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	gulp         = require('gulp'),
	sass         = require('gulp-sass');

function initBrowserSyncAndWatch() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
	gulp.watch('app/sass/**/*.+(scss|sass)').on('change', compileSass);
	gulp.watch(['app/js/**/*.js','app/**/*.html','app/**/*.php']).on('change', browserSync.reload);
};

function compileSass() {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
};
exports.watch = gulp.series(compileSass, initBrowserSyncAndWatch);
exports.default = gulp.series(compileSass, initBrowserSyncAndWatch);