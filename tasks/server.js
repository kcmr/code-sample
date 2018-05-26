'use strict';

const browserSync = require('browser-sync');

const config = {
  browsersync: {
    port: 5000,
    open: false,
    notify: false,
    ghostMode: false,
    reloadOnRestart: true,
    server: {
      baseDir: ['./'],
      index: 'index.html',
      routes: {
        '/': './node_modules'
      }
    }
  },
  watch: {
    sources: '**/*.{html,js,css}'
  }
};

browserSync
  .init(config.browsersync)
  .watch(config.watch.sources)
  .on('change', browserSync.reload);
