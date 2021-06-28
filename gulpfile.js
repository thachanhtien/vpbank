var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var cssmin = require("gulp-cssmin");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var browserSync = require("browser-sync").create();
var sourcemaps = require("gulp-sourcemaps");

gulp.task("sass", function() {
  return (
    gulp
      .src("src/assets/sass/style.scss")
      .pipe(sourcemaps.init())
      .pipe(sass()) //compile sass to css
      .pipe(sourcemaps.write("."))
      // .pipe(cssmin()) //minify css
      // .pipe(rename({
      //     suffix: '.min'
      // })) //change name
      .pipe(gulp.dest("pub/assets/css"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  ); //auto reload browser
});
gulp.task("sass-production", function() {
  return (
    gulp
      .src("src/assets/sass/style.scss")
      .pipe(sourcemaps.init())
      .pipe(sass()) //compile sass to css
      .pipe(sourcemaps.write("."))
      .pipe(cssmin()) //minify css
      .pipe(rename({
          suffix: '.min'
      })) //change name
      .pipe(gulp.dest("pub/assets/css"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  ); //auto reload browser
});

gulp.task("pug", function() {
  return gulp
    .src(["src/*.pug", "!src/partials/**/*.pug", "!src/layout.pug"])
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("pub"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    ); //auto reload browser
});
gulp.task("js", function() {
  return gulp.src("src/assets/js/**/*").pipe(gulp.dest("pub/assets/js"));
});

gulp.task("images", function() {
  return gulp
    .src("src/assets/images/**/*.+(png|jpg|jpeg|gif|svg|ico)")
    .pipe(
      cache(
        imagemin({
          interlaced: true,
          optimizationLevel: 7,
          progressive: true,
        })
      )
    )
    .pipe(gulp.dest("pub/assets/images"));
});

gulp.task("fonts", function() {
  return gulp.src("src/assets/fonts/**/*").pipe(gulp.dest("pub/assets/fonts"));
});

gulp.task("libs", function() {
  return gulp.src("src/assets/libs/**/*").pipe(gulp.dest("pub/assets/libs"));
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "pub"
    }
  });
});

gulp.task(
  "watch",
  ["browserSync", "sass", "pug", "images", "fonts", "libs", "js"],
  function() {
    gulp.watch("src/assets/sass/**/*.scss", ["sass"]);
    gulp.watch("src/**/*.pug", ["pug"]);
    gulp.watch("src/assets/js/**/*", ["js"]);
    gulp.watch("src/assets/fonts/**/*", ["fonts"]);
    gulp.watch("src/assets/libs/**/*", ["libs"]);
    gulp.watch("src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)", ["images"]);
    gulp.watch("src/*.html", browserSync.reload);
  }
);

// clear cache
gulp.task('clear', () =>
    cache.clearAll()
);
