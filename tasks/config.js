module.exports = {
  server: {
    port: 5000,
    open: false,
    notify: false,
    ghostMode: false,
    reloadOnRestart: true,
    server: {
      baseDir: ['./'],
      index: 'index.html',
      routes: {
        '/components/{{component}}': '.',
        '/components': 'node_modules'
      }
    },
    startPath: 'components/{{component}}/demo/index.html'
  },
  watch: {
    sources: '**/*.{html,js,css}'
  }
};
