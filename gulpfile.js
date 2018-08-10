'use strict';

const gulp = require('gulp');
const log = require('fancy-log');
const del = require('del');
const browserSync = require('browser-sync').create();
const portfinder = require('portfinder');
const {spawn} = require('child_process');
const inlineSource = require('gulp-inline-source');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pixels-to-rem');
const eslint = require('gulp-eslint');
const config = require('./buildconfig');
const manifest = require('./package.json');

const COMPONENT_PATH = manifest.name;
const COMPONENT_NAME = manifest.main;

const DIST_DIRECTORY = '.';
const TMP_DIRECTORY = '.tmp/';

const WATCHED_DIST_FILES = [
  COMPONENT_NAME,
  'index.html',
  'demo/**/*',
  'test/**/*',
].concat(config.watch.dist || []);

gulp.task('clean', () => del.sync([TMP_DIRECTORY]));

const startServer = (port) => {
  const polymerCliParams = ['serve', '--npm', '-p', port];
  const polymerServe = spawn('polymer', polymerCliParams);

  polymerServe.stdout.on('data', (data) => {
    log(`${data}`);
    browserSync.init(getServerConfig(port));
  });

  polymerServe.stderr.on('data', (data) => {
    log(`Error: ${data}`);
  });

  polymerServe.on('close', (code) => {
    log(`child process exited with code ${code}`);
  });
};

const getServerConfig = (port) => {
  return JSON.parse(
    JSON.stringify(config.server)
      .replace(/{{component}}/g, COMPONENT_PATH)
      .replace(/{{port}}/g, port)
    );
};

gulp.task('styles', () => {
  return gulp.src(['src/*.css'])
    .pipe(postcss([
      pxtorem(config.pxtorem),
      autoprefixer(config.autoprefixer),
    ]))
    .pipe(gulp.dest(TMP_DIRECTORY));
});

gulp.task('eslint', () => {
  return gulp.src(['src/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest(TMP_DIRECTORY));
});

gulp.task('build:dist', ['clean', 'styles', 'eslint'], () => {
  return gulp.src(['.tmp/**/*.js'])
    .pipe(inlineSource(config.inlineSource))
    .pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('start-server', () => {
  return portfinder.getPortPromise()
    .then(startServer)
    .catch((err) => log(err));
});

gulp.task('watch:sources', () => {
  gulp.watch(['src/*.{js, css}'], ['styles', 'eslint', 'build:dist']);
});

gulp.task('watch:dist', () => {
  gulp.watch(WATCHED_DIST_FILES).on('change', browserSync.reload);
});

gulp.task('serve', [
  'build:dist',
  'start-server',
  'watch:sources',
  'watch:dist',
]);
