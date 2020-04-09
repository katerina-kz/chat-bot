"use strict";

// EXPR

const gulp = require("gulp");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const del = require("del");
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const server = require('browser-sync').create();

const path = {
    build: { 
        html: 'build/',
        js: 'build/js/',
        style: 'build/styles/',
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/js/*.js',
        style: 'src/styles/*.css',
    }
};

// TASKS

gulp.task("clean", () => {
    return del(['build/']);
});

gulp.task("html", () => {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
});

gulp.task("require", () => {
    return gulp.src(path.src.require)
        .pipe(gulp.dest(path.build.js));
});

gulp.task("css", () => {
    return gulp.src(path.src.style)
    .pipe(sourcemaps.init())
        .pipe(concat(path.build.style))
        .pipe(rename("style.min.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style))
        .pipe(server.stream());
});

gulp.task("js", () => {
    return gulp.src(path.src.js)
    .pipe(sourcemaps.init())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(concat('bundle.js'))
        .pipe(rename("bundle.min.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(server.stream());
});


gulp.task("server", function () {
    server.init({
        watch: true,
        server: "./build",
    });

    gulp.watch(path.src.js, gulp.series("js"));
    gulp.watch(path.src.style, gulp.series("css"));
    gulp.watch(path.src.html, gulp.series("html", "refresh"));
});

gulp.task("refresh", (done) => {
    server.reload();
    done();
})

// ASSEMBLY

gulp.task("build", gulp.series(
    "clean",
    "html",
    "js",
    "css"
));

gulp.task("default", gulp.series("build", "server"));
