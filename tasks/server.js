'use strict';

const browserSync = require('browser-sync');
const config = require('./config');
const manifest = require('../package.json');
const component = manifest.name;
const serverConfig = JSON.parse(
  JSON.stringify(config.server)
    .replace(/{{component}}/g, component)
  );

browserSync
  .init(serverConfig)
  .watch(config.watch.sources)
  .on('change', browserSync.reload);
