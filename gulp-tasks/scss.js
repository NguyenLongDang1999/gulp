// ** Gulp Require
var sass = require("gulp-sass")(require("sass"));

module.exports = (gulp, callback) => {
    const scssMainTask = function () {
        return gulp
            .src(["bootstrap.scss"], { cwd: config.source.sass })
            .pipe(
                sass({
                    includePaths: ["node_modules", "assets"],
                })
            )
            .pipe(sass().on("error", sass.logError))
            .pipe(gulp.dest(config.destination.css));
    };

    const scssPagesTask = function () {
        return gulp
            .src(config.source.sass + "/pages/**/*.scss")
            .pipe(
                sass({
                    includePaths: ["node_modules", "assets"],
                })
            )
            .pipe(sass().on("error", sass.logError))
            .pipe(gulp.dest(config.destination.css + "/pages/"));
    };

    const scssPluginTask = function () {
        return gulp
            .src(config.source.sass + "/plugins/**/*.scss")
            .pipe(
                sass({
                    includePaths: ["node_modules", "assets"],
                })
            )
            .pipe(sass().on("error", sass.logError))
            .pipe(gulp.dest(config.destination.css + "/plugins/"));
    };

    const scssStyleTask = function () {
        return gulp
            .src(config.assets + "/scss/style.scss")
            .pipe(
                sass({
                    includePaths: ["node_modules", "assets"],
                })
            )
            .pipe(sass().on("error", sass.logError))
            .pipe(gulp.dest(config.assets + "/css/"));
    };

    const scssWatchTask = function () {
        return gulp.watch(
            [
                config.source.sass + "/**/*.scss",
                config.assets + "/scss/**/*.scss",
            ],
            gulp.parallel(
                scssMainTask,
                scssPagesTask,
                scssPluginTask,
                scssStyleTask
            )
        );
    };

    return {
        main: scssMainTask,
        pages: scssPagesTask,
        plugins: scssPluginTask,
        style: scssStyleTask,
        watch: scssWatchTask,
    };
};
