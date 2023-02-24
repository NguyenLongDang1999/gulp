// ** Gulp Require
var gulp = require("gulp");
var config = require("./config.json");

// ** Global Variables
global.config = config;

// ** Gulp-Tasks Require
const autoPrefixTasks = require("./gulp-tasks/autoprefix")(gulp);
const cleanTasks = require("./gulp-tasks/clean")(gulp);
const cssTasks = require("./gulp-tasks/css")(gulp);
const scssTasks = require("./gulp-tasks/scss")(gulp);
const uglifyTasks = require("./gulp-tasks/uglify")(gulp);
const vendorsTasks = require("./gulp-tasks/vendors")(gulp);

// ** Task:: Create Vendors File
gulp.task("dist-vendor-js", vendorsTasks.js);
gulp.task("dist-vendor-css", gulp.series(vendorsTasks.css));

// ** Task:: Clean CSS & JS
gulp.task("dist-clean", cleanTasks.css, cleanTasks.js);

// ** Task:: Watch Monitor
gulp.task("monitor", gulp.series(gulp.parallel(scssTasks.watch)));

// ** Task:: Dist JS
gulp.task("dist-js", gulp.series(cleanTasks.js, uglifyTasks.js));

// ** Task:: SASS Compile
gulp.task(
    "sass-compile",
    gulp.parallel(
        scssTasks.main,
        scssTasks.pages,
        scssTasks.plugins,
        scssTasks.style
    )
);

// ** Task:: CSS Distribution Task
gulp.task(
    "dist-css",
    gulp.series(
        cleanTasks.css,
        "sass-compile",
        autoPrefixTasks.css,
        cssTasks.css_comb,
        cssTasks.css_min
    )
);

// ** Task:: DEFAULT
gulp.task("default", gulp.parallel("dist-css", "dist-js"));
