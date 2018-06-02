'use strict';

const browserSync = require('browser-sync');
const portfinder = require('portfinder');
const { spawn } = require('child_process');
const config = require('./config');
const manifest = require('../package.json');

const startServer = (port) => {
  const polymerCliParams = ['serve', '--npm', '-p'];
  const polymerServe = spawn('polymer', polymerCliParams.concat(port));

  polymerServe.stdout.on('data', (data) => {
    console.log(`${data}`);

    browserSync
      .init(getServerConfig(port))
      .watch(config.watch.sources)
      .on('change', browserSync.reload);
  });

  polymerServe.stderr.on('data', (data) => {
    console.log(`Error: ${data}`);
  });

  polymerServe.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const getServerConfig = (port) => {
  const component = manifest.name;
  return JSON.parse(
    JSON.stringify(config.server)
      .replace(/{{component}}/g, component)
      .replace(/{{port}}/g, port)
    );
};

portfinder.getPortPromise()
  .then(startServer)
  .catch((err) => console.log(err));

